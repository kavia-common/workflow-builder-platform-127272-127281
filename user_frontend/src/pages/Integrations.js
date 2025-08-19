import React, { useEffect, useState } from 'react';
import Card from '../components/Card';
import { api } from '../services/api';
import { config } from '../services/env';

// PUBLIC_INTERFACE
export default function Integrations() {
  /** Manage Stripe and QuickBooks integrations with connect/disconnect actions. */
  const [status, setStatus] = useState({ stripe: { connected: false }, quickbooks: { connected: false } });
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState('');

  const load = async () => {
    setErr('');
    try {
      const res = await api.integrations.status();
      setStatus(res || { stripe: { connected: false }, quickbooks: { connected: false } });
    } catch (e) {
      setErr(e?.message || 'Failed to load integration status');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const handleConnect = async (provider) => {
    setErr('');
    try {
      let res;
      if (provider === 'stripe') {
        res = await api.integrations.connectStripe();
      } else if (provider === 'quickbooks') {
        res = await api.integrations.connectQuickBooks();
      }
      const redirect = res?.redirectUrl || res?.url;
      if (redirect) {
        window.open(redirect, '_blank', 'noopener,noreferrer');
      } else {
        // if no redirect is provided, reload status
        load();
      }
    } catch (e) {
      setErr(e?.message || `Failed to connect ${provider}`);
    }
  };

  const handleDisconnect = async (provider) => {
    setErr('');
    try {
      if (provider === 'stripe') {
        await api.integrations.disconnectStripe();
      } else if (provider === 'quickbooks') {
        await api.integrations.disconnectQuickBooks();
      }
      load();
    } catch (e) {
      setErr(e?.message || `Failed to disconnect ${provider}`);
    }
  };

  return (
    <>
      <h1 className="page-title">Integrations</h1>
      <p className="page-subtitle">Connect third-party services like Stripe and QuickBooks to automate billing and accounting.</p>

      <div className="card-grid">
        <Card className="h6" title="Stripe">
          {loading ? <p>Loading...</p> : (
            <>
              <p>Accept payments with Stripe. {config.STRIPE_PUBLIC_KEY ? '' : '(No STRIPE key configured in env for client).'}</p>
              <div className="row mt-8">
                {status?.stripe?.connected ? (
                  <>
                    <span style={{ color: 'var(--success)', fontWeight: 600 }}>Connected</span>
                    <button className="btn" onClick={() => handleDisconnect('stripe')}>Disconnect</button>
                  </>
                ) : (
                  <button className="btn btn-secondary" onClick={() => handleConnect('stripe')}>Connect Stripe</button>
                )}
              </div>
            </>
          )}
        </Card>

        <Card className="h6" title="QuickBooks">
          {loading ? <p>Loading...</p> : (
            <>
              <p>Sync invoices and payments with QuickBooks. {config.QUICKBOOKS_CLIENT_ID ? '' : '(No QuickBooks Client ID configured in env for client).'}</p>
              <div className="row mt-8">
                {status?.quickbooks?.connected ? (
                  <>
                    <span style={{ color: 'var(--success)', fontWeight: 600 }}>Connected</span>
                    <button className="btn" onClick={() => handleDisconnect('quickbooks')}>Disconnect</button>
                  </>
                ) : (
                  <button className="btn btn-secondary" onClick={() => handleConnect('quickbooks')}>Connect QuickBooks</button>
                )}
              </div>
            </>
          )}
        </Card>
      </div>
      {err && <p className="mt-16" style={{ color: 'var(--danger)' }}>{err}</p>}
    </>
  );
}
