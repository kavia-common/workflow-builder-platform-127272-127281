import React from 'react';
import Card from '../components/Card';
import { useAuth } from '../context/AuthContext';

// PUBLIC_INTERFACE
export default function Settings() {
  /** Basic account settings and user info view. */
  const { user } = useAuth();

  return (
    <>
      <h1 className="page-title">Settings</h1>
      <p className="page-subtitle">Manage your account and preferences.</p>

      <div className="card-grid">
        <Card className="h6" title="Profile">
          {!user ? <p>Loading...</p> : (
            <div className="form">
              <div><strong>Name:</strong> {user.name || '-'}</div>
              <div><strong>Email:</strong> {user.email || '-'}</div>
              <div><strong>Role:</strong> {user.role || 'owner'}</div>
            </div>
          )}
        </Card>

        <Card className="h6" title="Preferences">
          <p>Theme: Light (default)</p>
          <p>Notifications: Enabled</p>
        </Card>
      </div>
    </>
  );
}
