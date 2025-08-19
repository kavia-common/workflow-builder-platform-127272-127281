import React, { useEffect, useState } from 'react';
import Card from '../components/Card';
import { api } from '../services/api';

// PUBLIC_INTERFACE
export default function Dashboard() {
  /** Dashboard with generated apps and quick KPIs. */
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.apps.list()
      .then((res) => setApps(Array.isArray(res) ? res : (res?.items || [])))
      .catch(() => setApps([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <h1 className="page-title">Dashboard</h1>
      <p className="page-subtitle">Track your generated apps and key business metrics.</p>

      <div className="card-grid">
        <Card className="h3">
          <div className="stat">
            <div className="stat-value">{apps.length}</div>
            <div className="stat-label">Generated Apps</div>
          </div>
        </Card>
        <Card className="h3">
          <div className="stat">
            <div className="stat-value">24</div>
            <div className="stat-label">Open Leads</div>
          </div>
        </Card>
        <Card className="h3">
          <div className="stat">
            <div className="stat-value">$12.3k</div>
            <div className="stat-label">Unpaid Invoices</div>
          </div>
        </Card>
        <Card className="h3">
          <div className="stat">
            <div className="stat-value">$4.7k</div>
            <div className="stat-label">Payments (30d)</div>
          </div>
        </Card>

        <Card className="h12" title="Generated Applications">
          {loading ? (
            <p>Loading apps...</p>
          ) : apps.length === 0 ? (
            <p>No apps yet. Use the Workflow page to generate your first app.</p>
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Type</th>
                  <th>Created</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {apps.map((a) => (
                  <tr key={a.id || a.name}>
                    <td>{a.name}</td>
                    <td>{a.type || 'App'}</td>
                    <td>{a.createdAt ? new Date(a.createdAt).toLocaleString() : '-'}</td>
                    <td>{a.status || 'ready'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </Card>
      </div>
    </>
  );
}
