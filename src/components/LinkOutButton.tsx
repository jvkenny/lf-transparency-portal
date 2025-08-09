import { ExternalLink } from "lucide-react";

interface LinkOutButtonProps {
  label: string;
  href: string;
  className?: string;
}

export default function LinkOutButton({ label, href, className }: LinkOutButtonProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-1 rounded-md border border-neutral-200 px-3 py-2 text-sm text-blue-600 hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-blue-500 ${className ?? ""}`}
    >
      {label} <ExternalLink className="w-4 h-4" />
    </a>
  );
}
