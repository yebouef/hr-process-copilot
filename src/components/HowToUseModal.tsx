import {
  BarChart3,
  CheckCircle2,
  FileText,
  ListChecks,
  MousePointer2,
  Play,
  Route,
  ShieldCheck,
  X,
} from "lucide-react";
const steps = [
  {
    icon: MousePointer2,
    title: "Choose a fictional meeting",
    text: "Select one of five HR scenarios to explore a different business problem.",
  },
  {
    icon: Play,
    title: "Analyze the conversation",
    text: "Generate a structured, deterministic demo analysis without an API key.",
  },
  {
    icon: ListChecks,
    title: "Review opportunities",
    text: "See the recommended automations, Microsoft tools, owners, priorities, and savings.",
  },
  {
    icon: FileText,
    title: "Inspect the evidence",
    text: "Select an opportunity to review its evidence, solution, and scoring rationale.",
  },
  {
    icon: BarChart3,
    title: "Compare impact and effort",
    text: "Identify quick wins, strategic bets, and lower-priority work.",
  },
  {
    icon: CheckCircle2,
    title: "Make a decision",
    text: "Approve, dismiss, edit, or reprioritize with human review.",
  },
  {
    icon: Route,
    title: "Plan the next 90 days",
    text: "Review the roadmap, then print an executive brief for stakeholders.",
  },
];
export function HowToUseModal({
  onClose,
  onStart,
}: {
  onClose: () => void;
  onStart: () => void;
}) {
  return (
    <div className="guide-backdrop" onMouseDown={onClose}>
      <section
        className="guide-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="guide-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <header>
          <div>
            <span className="guide-icon">
              <Play />
            </span>
            <div>
              <h2 id="guide-title">How to use HR Process Copilot</h2>
              <p>
                From stakeholder conversation to an actionable automation plan.
              </p>
            </div>
          </div>
          <button
            className="icon-button"
            onClick={onClose}
            aria-label="Close how to use guide"
          >
            <X />
          </button>
        </header>
        <div className="guide-steps">
          {steps.map(({ icon: Icon, title, text }, index) => (
            <article key={title}>
              <span className="guide-number">{index + 1}</span>
              <Icon />
              <div>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            </article>
          ))}
        </div>
        <div className="guide-privacy">
          <ShieldCheck />
          <span>
            <strong>Safe demonstration environment</strong>This public prototype
            uses fictional people and deterministic sample output. Never enter
            confidential employee information.
          </span>
        </div>
        <footer>
          <button className="button secondary" onClick={onClose}>
            Close
          </button>
          <button className="button primary" onClick={onStart}>
            <Play />
            Start demo
          </button>
        </footer>
      </section>
    </div>
  );
}
