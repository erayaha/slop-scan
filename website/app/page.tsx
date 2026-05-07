import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-4xl font-bold mb-4">Erayaha</h1>
      <p className="text-muted-foreground mb-8 max-w-md">
        Erayaha builds open source tools that help developers build better,
        more ethical software.
      </p>
      <Link
        href="/oss"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-foreground text-background font-medium hover:opacity-90 transition-opacity"
      >
        View Open Source Projects →
      </Link>
    </div>
  );
}
