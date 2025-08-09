import { useMemo, useRef, useState } from "react";
import { Search, Send, Map as MapIcon, Download, FileText, AlertTriangle, ThumbsUp, ThumbsDown, Loader2, ExternalLink, MessageSquare, ChevronRight, CheckCircle, Link as LinkIcon } from "lucide-react";

import CatalogCard from "./CatalogCard";
/*
  Lake Forest Transparency Portal — Single-file demo
  --------------------------------------------------
  - Drop-in React component with TailwindCSS classes
  - "Demo Mode" returns mocked answers; switch to API mode by wiring askAI()
  - Layout includes: AI Q&A hero and GIS layer catalog

  How to use in production (high level):
  1) Replace askAI() with a secure backend endpoint (e.g., /api/ask) that calls your RAG + OpenAI.
  2) Feed source URLs from your CMS/ArcGIS Hub/AGOL Item pages.
  3) Ensure WCAG (labels, roles, focus states) — this demo includes basics.
*/

export default function TransparencyPortal() {
  const [query, setQuery] = useState("");
  const [answer, setAnswer] = useState(null as null | Answer);
  const [loading, setLoading] = useState(false);
  const [demoMode, setDemoMode] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);

  type Source = { title: string; url: string; updated?: string };
  type Answer = {
    text: string;
    confidence: "High" | "Medium" | "Low";
    sources: Source[];
    quickActions?: { label: string; href: string; icon?: React.ReactNode }[];
  };

  const chips = useMemo(
    () => [
      "Show Congressional Districts",
      "View Snow Removal Routes",
      "Find my Garbage Collection Area",
      "Open Zoning Map",
      "Download the Parcels layer",
      "See Hydrology features",
    ],
    []
  );

  const gisLayers = [
    "Congressional Districts",
    "Recreation_Area_POLY",
    "Hydrology_POLY",
    "Wards",
    "State Senate Districts",
    "State House of Representatives Districts",
    "Snow Removal Areas",
    "Snow Removal Routes",
    "Garbage Collection Areas",
    "Precincts",
    "ImportantPlace_POLY",
    "Transportation_LINE",
    "Conservancy Area",
    "Parcels",
    "Municipal_POLY",
    "HROSPD",
    "Zoning_POLY",
    "Street Label",
    "Major Road Label",
    "Municipal Boundary Mask",
  ];

  async function askAI(prompt: string): Promise<Answer> {
    // In production: POST to your server (do NOT call OpenAI directly from the browser)
    // const res = await fetch("/api/ask", { method: "POST", headers: {"Content-Type":"application/json"}, body: JSON.stringify({ prompt })});
    // return await res.json();

    // Demo response (mocked) to showcase the UX.
    await new Promise((r) => setTimeout(r, 900));

    const lower = prompt.toLowerCase();

    if (lower.includes("trash") || lower.includes("recycling")) {
      return {
        text:
          "For most single-family homes, pickup occurs once weekly between 7am–5pm. Enter your address on the Service Schedule page to confirm your specific day. Holiday weeks may shift service by one day.",
        confidence: "High",
        sources: [
          {
            title: "Refuse, Recycling & Yard Waste",
            url: "https://www.cityoflakeforest.com/",
            updated: "Updated: Jul 2025",
          },
        ],
        quickActions: [
          {
            label: "Look up my pickup day",
            href: "#",
            icon: <Search className="w-4 h-4" />,
          },
          {
            label: "Report missed pickup",
            href: "#",
            icon: <AlertTriangle className="w-4 h-4" />,
          },
        ],
      };
    }

    if (lower.includes("zoning")) {
      return {
        text:
          "Open the public zoning map and search your address. Parcels are symbolized by district; click for district code and a link to the zoning ordinance.",
        confidence: "High",
        sources: [
          {
            title: "Public Zoning Map (AGOL)",
            url: "https://www.arcgis.com/",
            updated: "Updated: Aug 2025",
          },
          {
            title: "Zoning Ordinance",
            url: "https://www.cityoflakeforest.com/",
          },
        ],
        quickActions: [
          { label: "Open Zoning Map", href: "#layers", icon: <MapIcon className="w-4 h-4" /> },
          { label: "Read ordinance", href: "#layers", icon: <FileText className="w-4 h-4" /> },
        ],
      };
    }

    if (lower.includes("foia")) {
      return {
        text:
          "Many commonly requested datasets are available without a FOIA. If you still need a record, submit a FOIA online and you’ll receive confirmation with the expected response timeline.",
        confidence: "High",
        sources: [
          { title: "FOIA – Public Records", url: "https://www.cityoflakeforest.com/" },
          { title: "Open Data Catalog (Hub)", url: "https://www.arcgis.com/" },
        ],
        quickActions: [
          { label: "Top requested datasets", href: "#layers", icon: <Download className="w-4 h-4" /> },
          { label: "Start FOIA request", href: "#", icon: <FileText className="w-4 h-4" /> },
        ],
      };
    }

    return {
      text:
        "I couldn’t confidently answer that yet. Please refine your question or open one of the featured resources below. You can also submit a FOIA request if needed.",
      confidence: "Low",
      sources: [
        { title: "City Website", url: "https://www.cityoflakeforest.com/" },
        { title: "Open Data Catalog (AGOL)", url: "https://www.arcgis.com/" },
      ],
        quickActions: [
          { label: "Explore GIS layers", href: "#layers", icon: <MapIcon className="w-4 h-4" /> },
        ],
    };
  }

  async function onAsk(e?: React.FormEvent) {
    e?.preventDefault();
    const q = query.trim();
    if (!q) return;
    setLoading(true);
    try {
      const res = demoMode ? await askAI(q) : await askAI(q); // swap when backend exists
      setAnswer(res);
    } finally {
      setLoading(false);
    }
  }

  function setChip(text: string) {
    setQuery(text);
    setTimeout(() => inputRef.current?.focus(), 0);
  }

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-neutral-200">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <MessageSquare className="w-6 h-6" aria-hidden />
            <span className="font-semibold tracking-tight">Lake Forest Transparency Portal</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={demoMode}
                onChange={(e) => setDemoMode(e.target.checked)}
                className="accent-neutral-800"
                aria-label="Toggle demo mode"
              />
              <span className="hidden sm:inline">Demo Mode</span>
            </label>
          </div>
        </div>
      </header>

      {/* Hero AI Q&A */}
      <section className="bg-gradient-to-b from-white to-neutral-50 border-b border-neutral-200">
        <div className="mx-auto max-w-3xl px-4 py-10">
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight mb-2">Ask Lake Forest</h1>
          <p className="text-neutral-600 mb-6">Ask about services, permits, maps, or city data. I’ll include sources in every answer.</p>

          <form onSubmit={onAsk} className="relative">
            <label htmlFor="lf-question" className="sr-only">
              Ask a question about city services or data
            </label>
            <input
              id="lf-question"
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g., What’s my trash & recycling day?"
              className="w-full rounded-2xl border border-neutral-300 bg-white px-4 py-3 pr-12 shadow-sm focus:outline-none focus:ring-2 focus:ring-neutral-900"
            />
            <button
              type="submit"
              disabled={loading}
              className="absolute right-2 top-1/2 -translate-y-1/2 inline-flex items-center gap-2 rounded-xl border border-neutral-300 bg-neutral-900 text-white px-3 py-2 text-sm hover:bg-neutral-800 disabled:opacity-50"
              aria-label="Send question"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              <span className="hidden sm:inline">Ask</span>
            </button>
          </form>

          {/* Chips */}
          <div className="flex flex-wrap gap-2 mt-4" aria-label="Suggested questions">
            {chips.map((c) => (
              <button
                key={c}
                onClick={() => setChip(c)}
                className="rounded-full border border-neutral-300 bg-white px-3 py-1.5 text-sm hover:bg-neutral-100"
              >
                {c}
              </button>
            ))}
          </div>

          {/* Answer Card */}
          <div className="mt-6">
            {answer && (
              <div className="rounded-2xl border border-neutral-200 bg-white shadow-sm overflow-hidden">
                <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-200 bg-neutral-50">
                  <div className="text-sm text-neutral-700">Answer</div>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="inline-flex items-center gap-1 rounded-full border px-2 py-0.5">
                      <CheckCircle className="w-3.5 h-3.5" />
                      Confidence: {answer.confidence}
                    </span>
                  </div>
                </div>
                <div className="px-4 py-4">
                  <p className="leading-relaxed text-neutral-800">{answer.text}</p>

                  {/* Quick actions */}
                  {answer.quickActions?.length ? (
                    <div className="flex flex-wrap gap-2 mt-4">
                      {answer.quickActions.map((qa, i) => (
                        <a
                          key={i}
                          href={qa.href}
                          className="inline-flex items-center gap-2 rounded-xl border border-neutral-300 bg-white px-3 py-2 text-sm hover:bg-neutral-100"
                        >
                          {qa.icon}
                          {qa.label}
                          <ChevronRight className="w-4 h-4" />
                        </a>
                      ))}
                    </div>
                  ) : null}

                  {/* Sources */}
                  <div className="mt-5">
                    <div className="text-xs uppercase tracking-wide text-neutral-500 mb-2">How I know</div>
                    <ul className="flex flex-wrap gap-2">
                      {answer.sources.map((s, i) => (
                        <li key={i}>
                          <a
                            href={s.url}
                            className="inline-flex items-center gap-1.5 rounded-full border border-neutral-300 bg-white px-3 py-1.5 text-sm hover:bg-neutral-100"
                          >
                            <LinkIcon className="w-4 h-4" /> {s.title}
                            <ExternalLink className="w-3.5 h-3.5 ml-1" />
                          </a>
                        </li>
                      ))}
                    </ul>
                    {answer.sources.some((s) => s.updated) && (
                      <div className="mt-2 text-xs text-neutral-500">
                        {answer.sources
                          .filter((s) => s.updated)
                          .map((s) => s.updated)
                          .join(" · ")}
                      </div>
                    )}
                  </div>

                  {/* Feedback */}
                  <div className="mt-5 flex items-center gap-3 text-sm">
                    <span className="text-neutral-600">Was this helpful?</span>
                    <button className="inline-flex items-center gap-1 rounded-lg border border-neutral-300 px-2 py-1 hover:bg-neutral-100">
                      <ThumbsUp className="w-4 h-4" />
                    </button>
                    <button className="inline-flex items-center gap-1 rounded-lg border border-neutral-300 px-2 py-1 hover:bg-neutral-100">
                      <ThumbsDown className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Disclosure */}
                <div className="px-4 py-3 bg-neutral-50 border-t border-neutral-200 text-xs text-neutral-600">
                  AI answers may be imperfect. Responses include source links — please verify before making decisions.
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="mx-auto max-w-6xl px-4 py-10">
        <section id="layers">
          <h2 className="text-xl font-semibold mb-2">GIS Layers</h2>
          <p className="text-neutral-600 mb-4">Explore available GIS layers for Lake Forest.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {gisLayers.map((name) => (
              <CatalogCard key={name} title={name} details="Feature Layer" href="#" />
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-14 border-t border-neutral-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-6 text-sm text-neutral-600">
          © {new Date().getFullYear()} City of Lake Forest · Built for transparency and self‑service
        </div>
      </footer>
    </div>
  );
}

