import { ChevronRight } from "lucide-react";

interface DashboardCardProps {
  title: string;
  desc: string;
}

export default function DashboardCard({ title, desc }: DashboardCardProps) {
  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
      <div className="font-medium">{title}</div>
      <div className="text-sm text-neutral-600 mt-1">{desc}</div>
      <div className="mt-3 inline-flex items-center gap-1 text-sm text-neutral-700">
        Open dashboard <ChevronRight className="w-4 h-4" />
      </div>
    </div>
  );
}
