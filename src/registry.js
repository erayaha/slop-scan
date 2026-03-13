/**
 * Checks a list of npm package names against the npm registry and the
 * npm downloads API to classify each one as:
 *
 *  ok          — exists and has ≥ threshold weekly downloads
 *  suspicious  — exists but has < threshold weekly downloads
 *  not-found   — 404 from the registry (hallucinated / does not exist)
 *  error       — network / unexpected error
 */

const REGISTRY_BASE = 'https://registry.npmjs.org';
const DOWNLOADS_BASE = 'https://api.npmjs.org/downloads/point/last-week';

/** Default weekly-download count below which a package is flagged suspicious. */
export const DEFAULT_THRESHOLD = 500;

/** Maximum number of in-flight registry requests at a time. */
const CONCURRENCY = 8;

/**
 * Builds the npm registry URL for a package's latest version metadata.
 * Scoped package names (e.g. @babel/core) require the `/` to be percent-encoded
 * so the registry interprets the full string as the package name rather than
 * treating the name as two path segments.
 *
 * @param {string} name
 * @returns {string}
 */
function registryUrl(name) {
  if (name.startsWith('@')) {
    // @scope/pkg  →  https://registry.npmjs.org/@scope%2Fpkg/latest
    // Use replaceAll (or a regex with /g) to encode ALL slashes, not just the first.
    const encoded = name.replaceAll('/', '%2F');
    return `${REGISTRY_BASE}/${encoded}/latest`;
  }
  return `${REGISTRY_BASE}/${name}/latest`;
}

/**
 * Builds the npm downloads API URL for a package.
 *
 * @param {string} name
 * @returns {string}
 */
function downloadsUrl(name) {
  return `${DOWNLOADS_BASE}/${encodeURIComponent(name)}`;
}

/**
 * Fetches the latest-version metadata for `name` from the npm registry.
 *
 * @param {string} name
 * @returns {Promise<{version: string} | null>}
 */
async function fetchMeta(name) {
  const res = await fetch(registryUrl(name), {
    signal: AbortSignal.timeout(15_000),
    headers: { Accept: 'application/json' },
  });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = await res.json();
  return { version: data.version };
}

/**
 * Fetches the last-week download count for `name`.
 * Returns `null` on any failure so that a downloads-API outage does not cause
 * existing packages to be falsely flagged as suspicious.
 *
 * @param {string} name
 * @returns {Promise<number | null>}
 */
async function fetchDownloads(name) {
  try {
    const res = await fetch(downloadsUrl(name), {
      signal: AbortSignal.timeout(15_000),
      headers: { Accept: 'application/json' },
    });
    if (!res.ok) return null;
    const data = await res.json();
    return typeof data.downloads === 'number' ? data.downloads : null;
  } catch {
    return null;
  }
}

/**
 * @typedef {{
 *   name: string,
 *   status: 'ok' | 'suspicious' | 'not-found' | 'error',
 *   version?: string,
 *   weeklyDownloads?: number,
 *   error?: string,
 * }} PackageResult
 *
 * `weeklyDownloads` is present and < threshold when status is 'suspicious',
 * may be present (≥ threshold) when status is 'ok', and absent when the
 * downloads API was unreachable.
 */

/**
 * Checks a single package against the npm registry and downloads API.
 *
 * @param {string} name
 * @param {number} threshold
 * @returns {Promise<PackageResult>}
 */
async function checkPackage(name, threshold) {
  try {
    const meta = await fetchMeta(name);

    if (meta === null) {
      return { name, status: 'not-found' };
    }

    const weeklyDownloads = await fetchDownloads(name);

    // Only flag as suspicious when we have confirmed download data showing
    // below the threshold. If the downloads API is unreachable (null), the
    // package is considered ok since it exists on the registry.
    if (weeklyDownloads !== null && weeklyDownloads < threshold) {
      return { name, status: 'suspicious', version: meta.version, weeklyDownloads };
    }

    return { name, status: 'ok', version: meta.version, weeklyDownloads: weeklyDownloads ?? undefined };
  } catch (err) {
    return { name, status: 'error', error: err.message };
  }
}

/**
 * Checks all packages in `names` in parallel (bounded by CONCURRENCY) and
 * returns an array of results in the same order as the input.
 *
 * @param {string[]} names
 * @param {{ threshold?: number }} [options]
 * @returns {Promise<PackageResult[]>}
 */
export async function checkPackages(names, options = {}) {
  const threshold = options.threshold ?? DEFAULT_THRESHOLD;
  const results = new Array(names.length);

  for (let i = 0; i < names.length; i += CONCURRENCY) {
    const batch = names.slice(i, i + CONCURRENCY);
    const batchResults = await Promise.all(
      batch.map(name => checkPackage(name, threshold)),
    );
    for (let j = 0; j < batchResults.length; j++) {
      results[i + j] = batchResults[j];
    }
  }

  return results;
}
