import React, { useEffect, useState } from 'react';
import Card from '../components/Card';
import { api } from '../services/api';

// PUBLIC_INTERFACE
export default function Invoices() {
  /** CRUD interface for managing invoices. */
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ customer: '', amount: '', status: 'draft' });
  const [editing, setEditing] = useState(null);
  const [error, setError] = useState('');

  const load = async () => {
    try {
      const res = await api.invoices.list();
      setItems(Array.isArray(res) ? res : (res?.items || []));
    } catch {
      setItems([]);
    }
  };

  useEffect(() => { load(); }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const payload = { ...form, amount: parseFloat(form.amount || 0) };
      if (editing) await api.invoices.update(editing.id, payload);
      else await api.invoices.create(payload);
      setForm({ customer: '', amount: '', status: 'draft' });
      setEditing(null);
      load();
    } catch (e) { setError(e?.message || 'Save failed'); }
  };

  const onEdit = (item) => {
    setEditing(item);
    setForm({ customer: item.customer || '', amount: String(item.amount || ''), status: item.status || 'draft' });
  };

  const onDelete = async (id) => {
    if (!window.confirm('Delete this invoice?')) return;
    try {
      await api.invoices.remove(id);
      load();
    } catch (e) { setError(e?.message || 'Delete failed'); }
  };

  return (
    <>
      <h1 className="page-title">Invoices</h1>
      <p className="page-subtitle">Issue, track, and manage invoices.</p>
      <div className="card-grid">
        <Card className="h6" title={editing ? 'Edit Invoice' : 'New Invoice'}>
          <form className="form" onSubmit={onSubmit}>
            <input className="input" placeholder="Customer" value={form.customer} onChange={(e) => setForm({ ...form, customer: e.target.value })} required />
            <input className="input" placeholder="Amount" type="number" step="0.01" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} required />
            <select className="select" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
              <option value="draft">Draft</option>
              <option value="sent">Sent</option>
              <option value="paid">Paid</option>
              <option value="overdue">Overdue</option>
            </select>
            <div className="row">
              <button className="btn btn-primary" type="submit">{editing ? 'Update Invoice' : 'Add Invoice'}</button>
              {editing && <button className="btn" type="button" onClick={() => { setEditing(null); setForm({ customer: '', amount: '', status: 'draft' }); }}>Cancel</button>}
            </div>
            {error && <p style={{ color: 'var(--danger)' }}>{error}</p>}
          </form>
        </Card>

        <Card className="h6" title="Invoices">
          <table className="table">
            <thead>
              <tr><th>Customer</th><th>Amount</th><th>Status</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {items.map((it) => (
                <tr key={it.id || `${it.customer}-${it.amount}`}>
                  <td>{it.customer}</td>
                  <td>${Number(it.amount || 0).toFixed(2)}</td>
                  <td>{it.status}</td>
                  <td className="row">
                    <button className="btn" onClick={() => onEdit(it)}>Edit</button>
                    <button className="btn" onClick={() => onDelete(it.id)}>Delete</button>
                  </td>
                </tr>
              ))}
              {items.length === 0 && <tr><td colSpan="4">No invoices yet.</td></tr>}
            </tbody>
          </table>
        </Card>
      </div>
    </>
  );
}
