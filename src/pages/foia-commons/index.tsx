import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LinkOutButton from "../../components/LinkOutButton";

interface FoiaItem {
  title: string;
  description: string;
  relatedDatasetIds: string[];
  howToSteps: string[];
  officialLinks: { label: string; href: string }[];
  notes: string;
}

interface Dataset {
  id: string;
  title: string;
}

export default function FoiaCommonsPage() {
  const [items, setItems] = useState<FoiaItem[]>([]);
  const [datasets, setDatasets] = useState<Record<string, Dataset>>({});

  useEffect(() => {
    fetch("/foia-commons.json")
      .then((res) => res.json())
      .then((data) => setItems(data))
      .catch((err) => console.error("foia fetch", err));

    fetch("/datasets.json")
      .then((res) => res.json())
      .then((data: Dataset[]) => {
        const map: Record<string, Dataset> = {};
        data.forEach((d) => {
          map[d.id] = d;
        });
        setDatasets(map);
      })
      .catch((err) => console.error("datasets fetch", err));
  }, []);

  return (
    <div className="p-6">
      <nav className="mb-4">
        <Link to="/" className="text-sm text-blue-600 hover:underline">
          &larr; Back to Home
        </Link>
      </nav>
      <h1 className="text-2xl font-semibold mb-4">FOIA Commons</h1>
      {items.map((item) => (
        <section key={item.title} className="mb-8">
          <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
          <p className="text-neutral-700 mb-2">{item.description}</p>
          <p className="mb-2">{item.notes}</p>
          <ol className="list-decimal pl-6 mb-4">
            {item.howToSteps.map((step, idx) => (
              <li key={idx} className="mb-1">
                {step}
              </li>
            ))}
          </ol>
          {item.relatedDatasetIds?.length > 0 && (
            <div className="mb-4">
              <h3 className="font-medium">Related Datasets</h3>
              <ul className="list-disc pl-6">
                {item.relatedDatasetIds.map((id) => {
                  const dataset = datasets[id];
                  return (
                    <li key={id}>
                      <Link
                        to={`/datasets/${id}`}
                        className="text-blue-600 hover:underline"
                      >
                        {dataset?.title ?? id}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
          {item.officialLinks?.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {item.officialLinks.map((link) => (
                <LinkOutButton
                  key={link.href}
                  label={link.label}
                  href={link.href}
                />
              ))}
            </div>
          )}
        </section>
      ))}
    </div>
  );
}

