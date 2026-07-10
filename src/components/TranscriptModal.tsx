import { BookOpen, ShieldCheck, Sparkles, X } from "lucide-react";
import { demoScenarios } from "../data/demo";
type Props = {
  value: string;
  loading: boolean;
  error: string;
  onChange: (v: string) => void;
  onDemo: (v: string) => void;
  onAnalyze: () => void;
  onHowToUse: () => void;
  onClose?: () => void;
};
export function TranscriptModal({
  value,
  loading,
  error,
  onChange,
  onDemo,
  onAnalyze,
  onHowToUse,
  onClose,
}: Props) {
  return (
    <div className="modal-backdrop">
      <section
        className="transcript-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="transcript-title"
      >
        <header>
          <div>
            <span className="modal-icon">
              <Sparkles />
            </span>
            <div>
              <h1 id="transcript-title">Analyze a stakeholder meeting</h1>
              <p>
                Choose a fictional scenario or paste an approved transcript.
              </p>
            </div>
          </div>
          {onClose && (
            <button
              className="icon-button"
              onClick={onClose}
              aria-label="Close"
            >
              <X />
            </button>
          )}
        </header>
        <label>Fictional meeting library</label>
        <div className="scenario-grid">
          {demoScenarios.map((s) => (
            <button
              key={s.id}
              className={
                value === s.transcript ? "scenario selected" : "scenario"
              }
              onClick={() => onDemo(s.transcript)}
            >
              <strong>{s.title}</strong>
              <span>{s.department}</span>
              <small>{s.focus}</small>
            </button>
          ))}
        </div>
        <label htmlFor="transcript">Meeting transcript</label>
        <textarea
          id="transcript"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Paste a fictional or approved meeting transcript here…"
        />
        <div className="privacy-inline">
          <ShieldCheck />
          <span>
            <strong>Protect confidential information.</strong> Use approved data
            only. The public demo uses deterministic fictional output.
          </span>
        </div>
        {error && (
          <div className="error" role="alert">
            {error}
          </div>
        )}
        <footer>
          <button className="button secondary" onClick={onHowToUse}>
            <BookOpen />
            How to use
          </button>
          <span>{value.trim().split(/\s+/).filter(Boolean).length} words</span>
          <button
            className="button primary analyze-button"
            onClick={onAnalyze}
            disabled={loading}
          >
            {loading ? (
              <>
                <i className="spinner" />
                Analyzing meeting…
              </>
            ) : (
              <>
                <Sparkles />
                Analyze meeting
              </>
            )}
          </button>
        </footer>
      </section>
    </div>
  );
}
