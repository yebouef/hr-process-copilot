import {
  BarChart3,
  FileText,
  HelpCircle,
  LayoutDashboard,
  Route,
  Settings,
  Sparkles,
} from "lucide-react";
type Props = { active: string; onNavigate: (value: string) => void };
const items = [
  { id: "analyze", label: "Analyze", icon: Sparkles },
  { id: "opportunities", label: "Opportunities", icon: LayoutDashboard },
  { id: "roadmap", label: "Roadmap", icon: Route },
  { id: "brief", label: "Executive brief", icon: FileText },
];
export function Sidebar({ active, onNavigate }: Props) {
  return (
    <aside className="sidebar">
      <button className="brand" onClick={() => onNavigate("analyze")}>
        <span className="brand-mark">
          <BarChart3 size={22} />
        </span>
        <span>
          HR Process
          <br />
          Copilot
        </span>
      </button>
      <nav aria-label="Primary navigation">
        {items.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              className={active === id ? "nav-item active" : "nav-item"}
              onClick={() => onNavigate(id)}
              aria-current={active === id ? "page" : undefined}
          >
            <Icon size={19} />
            <span>{label}</span>
          </button>
        ))}
      </nav>
      <div className="sidebar-bottom">
        <button className="nav-item" disabled title="Available in a connected production workspace">
          <Settings size={19} />
          <span>Settings</span>
        </button>
        <button className="nav-item" disabled title="Available in a connected production workspace">
          <HelpCircle size={19} />
          <span>Help & feedback</span>
        </button>
        <div className="profile">
          <span className="avatar">HT</span>
          <span>
            <strong>HR Tech Manager</strong>
            <small>Demo workspace</small>
          </span>
        </div>
      </div>
    </aside>
  );
}
