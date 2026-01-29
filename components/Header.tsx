export function Header({ title }: { title: string }) {
  return (
    <header className="text-center mb-12">
      <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-4">
        {title}
      </h1>
      <div className="inline-flex items-center gap-2 bg-slate-800/50 px-4 py-2 rounded-full border border-slate-700">
        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
        <span className="text-slate-300 text-sm">All Systems Operational</span>
      </div>
    </header>
  );
}
