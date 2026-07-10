import {
  CheckCircle2,
  MoreVertical,
  Plus,
  Printer,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Insights } from "./components/Insights";
import { ImpactMatrix } from "./components/ImpactMatrix";
import { MetricStrip } from "./components/MetricStrip";
import { OpportunityPipeline } from "./components/OpportunityPipeline";
import { OpportunityDrawer } from "./components/OpportunityDrawer";
import { HowToUseModal } from "./components/HowToUseModal";
import { Roadmap } from "./components/Roadmap";
import { Sidebar } from "./components/Sidebar";
import { TranscriptModal } from "./components/TranscriptModal";
import { analysisService } from "./services/analysisService";
import type { Analysis, Opportunity } from "./types/analysis";
import { clearAnalysis, saveAnalysis } from "./utils/storage";

export default function App() {
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [transcript, setTranscript] = useState("");
  const [modal, setModal] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selected, setSelected] = useState<string | null>("loa");
  const [active, setActive] = useState("analyze");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [showGuide, setShowGuide] = useState(false);
  useEffect(() => {
    if (analysis) saveAnalysis(analysis);
  }, [analysis]);
  useEffect(() => {
    if (!analysis || modal) return;
    const sections = ["brief", "opportunities", "roadmap"]
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visibleEntry) setActive(visibleEntry.target.id);
      },
      { rootMargin: "-18% 0px -62% 0px", threshold: [0, 0.2, 0.5] },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [analysis, modal]);
  const visible = useMemo(
    () =>
      analysis?.automationOpportunities.filter(
        (o) => o.decision !== "dismissed",
      ) ?? [],
    [analysis],
  );
  const analyze = async () => {
    setLoading(true);
    setError("");
    try {
      const result = await analysisService.analyze(transcript);
      setAnalysis(result);
      setSelected(result.automationOpportunities[0].id);
      setActive("brief");
      setModal(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (e) {
      setError(
        e instanceof Error ? e.message : "Unable to analyze this transcript.",
      );
    } finally {
      setLoading(false);
    }
  };
  const updateOpportunity = (id: string, patch: Partial<Opportunity>) =>
    setAnalysis((a) =>
      a
        ? {
            ...a,
            automationOpportunities: a.automationOpportunities.map((o) =>
              o.id === id ? { ...o, ...patch } : o,
            ),
          }
        : a,
    );
  const selectOpportunity = (id: string) => {
    setSelected(id);
    setDrawerOpen(true);
  };
  const navigate = (id: string) => {
    setActive(id);
    if (id === "analyze") {
      setModal(true);
      return;
    }
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  const reset = () => {
    clearAnalysis();
    setTranscript("");
    setError("");
    setActive("analyze");
    setModal(true);
  };
  if (!analysis)
    return (
      <>
        <div className="empty-shell">
          <div className="empty-brand">
            <Sparkles /> HR Process Copilot
          </div>
        </div>
        {modal && (
          <TranscriptModal
            value={transcript}
            loading={loading}
            error={error}
            onChange={setTranscript}
            onDemo={setTranscript}
            onAnalyze={analyze}
            onHowToUse={() => setShowGuide(true)}
          />
        )}
        {showGuide && (
          <HowToUseModal
            onClose={() => setShowGuide(false)}
            onStart={() => setShowGuide(false)}
          />
        )}
      </>
    );
  return (
    <div className="app-shell">
      <Sidebar
        active={active}
        onNavigate={navigate}
        onHowToUse={() => setShowGuide(true)}
      />
      <main className="main">
        <header className="topbar">
          <div>
            <div className="title-line">
              <h1>Meeting analysis</h1>
              <span className="completed">
                <CheckCircle2 />
                Completed
              </span>
            </div>
            <p>
              Fictional HR technology discovery meeting · Local demo analysis
            </p>
          </div>
          <div className="top-actions">
            <button className="button primary" onClick={reset}>
              <Plus />
              New analysis
            </button>
            <button className="button secondary" onClick={() => window.print()}>
              <Printer />
              Print brief
            </button>
            <button className="icon-button" aria-label="More options">
              <MoreVertical />
            </button>
          </div>
        </header>
        <MetricStrip analysis={analysis} />
        <section className="summary" id="brief">
          <span>
            <Sparkles />
          </span>
          <div>
            <strong>Executive summary</strong>
            <p>{analysis.meetingSummary}</p>
          </div>
        </section>
        <div className="dashboard-grid">
          <OpportunityPipeline
            items={visible}
            selected={selected}
            onSelect={selectOpportunity}
            onChange={updateOpportunity}
          />
          <aside className="right-rail">
            <ImpactMatrix items={visible} onSelect={selectOpportunity} />
            <Insights analysis={analysis} />
          </aside>
        </div>
        <Roadmap items={analysis.roadmap} />
        <footer className="privacy-footer">
          <ShieldCheck />
          <span>
            <strong>AI-generated insights require human review.</strong>{" "}
            Contains fictional sensitive HR scenarios. Never use this tool to
            rank employees or make employment decisions.
          </span>
        </footer>
      </main>
      {modal && (
        <TranscriptModal
          value={transcript}
          loading={loading}
          error={error}
          onChange={setTranscript}
          onDemo={setTranscript}
          onAnalyze={analyze}
          onHowToUse={() => setShowGuide(true)}
          onClose={() => setModal(false)}
        />
      )}
      {drawerOpen &&
        selected &&
        analysis.automationOpportunities.find(
          (item) => item.id === selected,
        ) && (
          <OpportunityDrawer
            opportunity={analysis.automationOpportunities.find(
              (item) => item.id === selected,
            )!}
            onClose={() => setDrawerOpen(false)}
            onChange={(patch) => updateOpportunity(selected, patch)}
          />
        )}
      {showGuide && (
        <HowToUseModal
          onClose={() => setShowGuide(false)}
          onStart={() => {
            setShowGuide(false);
            setActive("analyze");
            setModal(true);
          }}
        />
      )}
    </div>
  );
}
