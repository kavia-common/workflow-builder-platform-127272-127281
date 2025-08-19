import React from 'react';
import { NavLink } from 'react-router-dom';

// PUBLIC_INTERFACE
export default function Sidebar() {
  /** Sidebar navigation with grouped links. */
  const linkClass = ({ isActive }) => `nav-item ${isActive ? 'active' : ''}`;
  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-logo">WB</div>
        <div className="brand-name">Workflow Builder</div>
      </div>

      <div className="nav-group">
        <div className="nav-title">Main</div>
        <NavLink to="/" className={linkClass}>
          <span>🏠</span>
          <span className="nav-text">Dashboard</span>
        </NavLink>
        <NavLink to="/workflow" className={linkClass}>
          <span>🧩</span>
          <span className="nav-text">Workflow</span>
        </NavLink>
      </div>

      <div className="nav-group">
        <div className="nav-title">Data</div>
        <NavLink to="/leads" className={linkClass}>
          <span>👤</span>
          <span className="nav-text">Leads</span>
        </NavLink>
        <NavLink to="/invoices" className={linkClass}>
          <span>📄</span>
          <span className="nav-text">Invoices</span>
        </NavLink>
        <NavLink to="/payments" className={linkClass}>
          <span>💳</span>
          <span className="nav-text">Payments</span>
        </NavLink>
      </div>

      <div className="nav-group">
        <div className="nav-title">Integrations</div>
        <NavLink to="/integrations" className={linkClass}>
          <span>🔌</span>
          <span className="nav-text">Integrations</span>
        </NavLink>
      </div>

      <div className="nav-group">
        <div className="nav-title">Account</div>
        <NavLink to="/settings" className={linkClass}>
          <span>⚙️</span>
          <span className="nav-text">Settings</span>
        </NavLink>
      </div>
    </aside>
  );
}
