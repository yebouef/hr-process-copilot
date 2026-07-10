import {
  Check,
  Clock3,
  Gauge,
  ShieldAlert,
  ThumbsDown,
  ThumbsUp,
  UserRound,
  X,
} from "lucide-react";
import { useEffect } from "react";
import type { Opportunity } from "../types/analysis";

type Props = {
  opportunity: Opportunity;
  onClose: () => void;
  onChange: (patch: Partial<Opportunity>) => void;
};

export function OpportunityDrawer({ opportunity, onClose, onChange }: Props) {
  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) =>
      event.key === "Escape" && onClose();
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [onClose]);

  return (
    <div className="drawer-backdrop" onMouseDown={onClose}>
      <aside
        className="opportunity-drawer"
        role="dialog"
        aria-modal="true"
        aria-labelledby="drawer-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <header>
          <div>
            <span
              className={`drawer-priority ${opportunity.priority.toLowerCase()}`}
            >
              {opportunity.priority} priority
            </span>
            <h2 id="drawer-title">{opportunity.title}</h2>
            <p>{opportunity.affectedTeam}</p>
          </div>
          <button
            className="icon-button"
            onClick={onClose}
            aria-label="Close opportunity details"
          >
            <X />
          </button>
        </header>

        <div className="drawer-score-grid">
          <div>
            <Gauge />
            <span>
              <small>Impact</small>
              <strong>{opportunity.impactScore}/5</strong>
            </span>
          </div>
          <div>
            <Gauge />
            <span>
              <small>Effort</small>
              <strong>{opportunity.effortScore}/5</strong>
            </span>
          </div>
          <div>
            <Clock3 />
            <span>
              <small>Monthly savings</small>
              <strong>{opportunity.estimatedTimeSaved} hrs</strong>
            </span>
          </div>
          <div>
            <ShieldAlert />
            <span>
              <small>Data risk</small>
              <strong>{opportunity.riskLevel}</strong>
            </span>
          </div>
        </div>

        <section className="drawer-section evidence-section">
          <h3>Evidence from the meeting</h3>
          <blockquote>“{opportunity.evidence}”</blockquote>
        </section>
        <section className="drawer-section">
          <h3>Problem to solve</h3>
          <p>{opportunity.problem}</p>
        </section>
        <section className="drawer-section solution-section">
          <h3>Recommended Microsoft solution</h3>
          <strong>{opportunity.recommendedSolution}</strong>
          <p>{opportunity.expectedOutcome}</p>
        </section>
        <section className="drawer-section score-rationale">
          <h3>Why this score?</h3>
          <div>
            <span>Impact</span>
            <p>
              {opportunity.impactScore >= 4
                ? "High potential to reduce recurring work or improve service quality."
                : "Useful improvement with a more focused operational benefit."}
            </p>
          </div>
          <div>
            <span>Effort</span>
            <p>
              {opportunity.effortScore >= 4
                ? "Requires integration, governance, or significant process redesign."
                : "Can be validated through a focused prototype using existing tools."}
            </p>
          </div>
        </section>
        <section className="drawer-section next-step">
          <UserRound />
          <div>
            <small>Suggested owner</small>
            <strong>{opportunity.owner}</strong>
            <p>{opportunity.nextStep}</p>
          </div>
        </section>

        <footer>
          {opportunity.decision === "approved" && (
            <span className="drawer-decision">
              <Check />
              Approved for validation
            </span>
          )}
          <button
            className="button secondary"
            onClick={() => onChange({ decision: "dismissed" })}
          >
            <ThumbsDown />
            Dismiss
          </button>
          <button
            className="button primary"
            onClick={() => onChange({ decision: "approved" })}
          >
            <ThumbsUp />
            Approve opportunity
          </button>
        </footer>
      </aside>
    </div>
  );
}
