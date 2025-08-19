import React from 'react';
import { useAuth } from '../context/AuthContext';

// PUBLIC_INTERFACE
export default function Topbar() {
  /** Top navigation bar with search and user actions. */
  const { user, logout } = useAuth();

  return (
    <header className="topbar">
      <div className="topbar-left">
        <div className="search">
          <span>🔎</span>
          <input placeholder="Search..." />
        </div>
      </div>
      <div className="topbar-right">
        <button className="icon-btn" aria-label="Notifications">🔔</button>
        <div className="user-chip">
          <span>👤</span>
          <span style={{ fontWeight: 600, fontSize: 14 }}>{user?.name || user?.email || 'User'}</span>
        </div>
        <button className="btn" onClick={logout}>Logout</button>
      </div>
    </header>
  );
}
