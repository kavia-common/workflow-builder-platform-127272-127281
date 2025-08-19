import React, { useEffect, useState } from 'react';
import Card from '../components/Card';
import { api } from '../services/api';

// PUBLIC_INTERFACE
export default function Payments() {
  /** CRUD interface for managing payments. */
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ reference: '', amount: '', method: 'card' });
  const [editing, setEditing] = useState(null);
  const [error, setError] = useState('');

  const load = async () => {
    try {
      const res = await api.payments.list();
      setItems(Array.isArray(res) ? res : (res?.items || []));
    } catch { setItems([]); }
  };

  useEffect(() => { load(); }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const payload = { ...form, amount: parseFloat(form.amount || 0) };
      if (editing) await api.payments.update(editing.id, payload);
      else await api.payments.create(payload);
      setForm({ reference: '', amount: '', method: 'card' });
      setEditing(null);
      load();
    } catch (e) { setError(e?.message || 'Save failed'); }
  };

  const onEdit = (item) => {
    setEditing(item);
    setForm({ reference: item.reference || '', amount: String(item.amount || ''), method: item.method || 'card' });
  };

  const onDelete = async (id) => {
    if (!window.confirm('Delete this payment?')) return;
    try {
      await api.payments.remove(id);
      load();
    } catch (e) { setError(e?.message || 'Delete failed'); }
  };

  return (
    <>
      <h1 className="page-title">Payments</h1>
      <p className="page-subtitle">Record and view received payments.</p>
      <div className="card-grid">
        <Card className="h6" title={editing ? 'Edit Payment' : 'New Payment'}>
          <form className="form" onSubmit={onSubmit}>
            <input className="input" placeholder="Reference" value={form.reference} onChange={(e) => setForm({ ...form, reference: e.target.value })} required />
            <input className="input" placeholder="Amount" type="number" step="0.01" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} required />
            <select className="select" value={form.method} onChange={(e) => setForm({ ...form, method: e.target.value })}>
              <option value="card">Card</option>
              <option value="bank">Bank</option>
              <option value="cash">Cash</option>
            </select>
            <div className="row">
              <button className="btn btn-primary" type="submit">{editing ? 'Update Payment' : 'Add Payment'}</button>
              {editing && <button className="btn" type="button" onClick={() => { setEditing(null); setForm({ reference: '', amount: '', method: 'card' }); }}>Cancel</button>}
            </div>
            {error && <p style={{ color: 'var(--danger)' }}>{error}</p>}
          </form>
        </Card>

        <Card className="h6" title="Payments">
          <table className="table">
            <thead>
              <tr><th>Reference</th><th>Amount</th><th>Method</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {items.map((it) => (
                <tr key={it.id || `${it.reference}-${it.amount}`}>
                  <td>{it.reference}</td>
                  <td>${Number(it.amount || 0).toFixed(2)}</td>
                  <td>{it.method}</td>
                  <td className="row">
                    <button className="btn" onClick={() => onEdit(it)}>Edit</button>
                    <button className="btn" onClick={() => onDelete(it.id)}>Delete</button>
                  </td>
                </tr>
              ))}
              {items.length === 0 && <tr><td colSpan="4">No payments yet.</td></tr>}
            </tbody>
          </table>
        </Card>
      </div>
    </>
  );
}
