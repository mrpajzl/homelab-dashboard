import { Doc } from "@/convex/_generated/dataModel";

export function ServiceTile({ service }: { service: Doc<"services"> }) {
  return (
    <a
      href={service.url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-3 p-4 bg-slate-700/50 hover:bg-slate-700 rounded-lg border border-slate-600 hover:border-blue-500 transition-all duration-200 group min-h-[60px]"
    >
      <span className="text-2xl flex-shrink-0 group-hover:scale-110 transition-transform">
        {service.icon}
      </span>
      <span className="text-white font-medium group-hover:text-blue-400 transition-colors flex-1">
        {service.name}
      </span>
      <svg
        className="ml-auto w-5 h-5 flex-shrink-0 text-slate-400 group-hover:text-blue-400 transition-colors"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
        />
      </svg>
    </a>
  );
}
