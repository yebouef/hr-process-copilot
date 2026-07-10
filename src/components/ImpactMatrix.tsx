import type { Opportunity } from "../types/analysis";

const colors = ["#155eef", "#e5484d", "#eea708", "#7c5ce7", "#129b9b"];

export function ImpactMatrix({
  items,
  onSelect,
}: {
  items: Opportunity[];
  onSelect: (id: string) => void;
}) {
  const position = (score: number) => 12 + ((score - 1) / 4) * 76;

  return (
    <section className="panel matrix-panel">
      <header className="section-head matrix-heading">
        <div>
          <h2>Impact vs. effort</h2>
          <p>Prioritize quick wins and strategic investments</p>
        </div>
        <span className="matrix-count">{items.length} opportunities</span>
      </header>
      <div className="matrix-wrap">
        <div className="matrix-scale-y" aria-hidden="true">
          <span>5</span>
          <span>Impact</span>
          <span>1</span>
        </div>
        <div
          className="matrix"
          role="img"
          aria-label="Impact versus effort matrix"
        >
          <span className="quad q1">Quick wins</span>
          <span className="quad q2">Strategic bets</span>
          <span className="quad q3">Low lift</span>
          <span className="quad q4">Reconsider</span>
          {items.map((opportunity, index) => {
            const duplicateIndex = items
              .slice(0, index)
              .filter(
                (item) =>
                  item.impactScore === opportunity.impactScore &&
                  item.effortScore === opportunity.effortScore,
              ).length;
            return (
              <button
                key={opportunity.id}
                onClick={() => onSelect(opportunity.id)}
                className="matrix-dot"
                aria-label={`${opportunity.title}: impact ${opportunity.impactScore} of 5, effort ${opportunity.effortScore} of 5`}
                style={{
                  left: `${position(opportunity.effortScore)}%`,
                  bottom: `${position(opportunity.impactScore)}%`,
                  background: colors[index % colors.length],
                  translate: `${duplicateIndex * 9}px ${duplicateIndex * 9}px`,
                }}
              >
                {index + 1}
                <span className="matrix-tooltip">
                  <strong>{opportunity.title}</strong>
                  <small>
                    Impact {opportunity.impactScore} · Effort{" "}
                    {opportunity.effortScore}
                  </small>
                </span>
              </button>
            );
          })}
        </div>
        <div className="matrix-scale-x" aria-hidden="true">
          <span>1</span>
          <strong>Effort</strong>
          <span>5</span>
        </div>
      </div>
      <ol className="matrix-key">
        {items.map((opportunity, index) => (
          <li key={opportunity.id}>
            <i style={{ background: colors[index % colors.length] }}>
              {index + 1}
            </i>
            <span>{opportunity.title}</span>
            <small>
              I{opportunity.impactScore} · E{opportunity.effortScore}
            </small>
          </li>
        ))}
      </ol>
    </section>
  );
}
