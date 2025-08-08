import { ChevronRight } from "lucide-react";

interface CatalogCardProps {
  title: string;
  details: string;
  href: string;
}

export default function CatalogCard({ title, details, href }: CatalogCardProps) {
  return (
    <a
      href={href}
      className="block rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm hover:shadow-md transition"
    >
      <div className="font-medium">{title}</div>
      <div className="text-sm text-neutral-600 mt-1">{details}</div>
      <div className="mt-3 inline-flex items-center gap-1 text-sm text-neutral-700">
        View dataset <ChevronRight className="w-4 h-4" />
      </div>
    </a>
  );
}
