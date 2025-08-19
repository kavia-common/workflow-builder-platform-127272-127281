import React, { useState } from 'react';
import Card from '../components/Card';
import { api } from '../services/api';

// PUBLIC_INTERFACE
export default function WorkflowBuilder() {
  /** Allows users to describe their workflow which triggers app generation. */
  const [description, setDescription] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr('');
    setResult(null);
    setLoading(true);
    try {
      const res = await api.workflows.generateFromDescription(description);
      setResult(res);
      setDescription('');
    } catch (error) {
      setErr(error?.message || 'Failed to generate workflow');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h1 className="page-title">Workflow Builder</h1>
      <p className="page-subtitle">Describe your business workflow and let the platform generate an app for you.</p>

      <div className="card-grid">
        <Card className="h12">
          <form className="form" onSubmit={handleSubmit}>
            <label>
              <div style={{ fontWeight: 600, marginBottom: 6 }}>Workflow Description</div>
              <textarea
                className="textarea"
                placeholder="Example: We track leads, issue invoices, and collect payments through Stripe..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </label>
            <div className="row">
              <button className="btn btn-primary" type="submit" disabled={loading}>
                {loading ? 'Generating...' : 'Generate App'}
              </button>
            </div>
          </form>
          {err && <p style={{ color: 'var(--danger)' }} className="mt-12">{err}</p>}
          {result && (
            <div className="mt-16">
              <h3 className="card-title">Generation Result</h3>
              <pre style={{ background: '#f6f8fa', padding: 12, borderRadius: 8, overflow: 'auto' }}>
                {JSON.stringify(result, null, 2)}
              </pre>
            </div>
          )}
        </Card>
      </div>
    </>
  );
}
