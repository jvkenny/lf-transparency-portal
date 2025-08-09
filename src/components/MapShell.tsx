import { Link } from "react-router-dom";

interface MapShellProps {
  title: string;
  description?: string;
}

export default function MapShell({ title, description }: MapShellProps) {
  return (
    <div className="p-6">
      <nav className="mb-4">
        <Link to="/" className="text-sm text-blue-600 hover:underline">
          &larr; Back to Home
        </Link>
      </nav>
      <h1 className="text-2xl font-semibold mb-2">{title}</h1>
      {description && <p className="text-neutral-600 mb-4">{description}</p>}
      <div id="map-container" className="w-full h-96 bg-neutral-100 rounded" />
    </div>
  );
}
