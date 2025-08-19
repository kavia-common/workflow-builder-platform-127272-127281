import React, { useEffect, useState } from 'react';
import Card from '../components/Card';
import { api } from '../services/api';

// PUBLIC_INTERFACE
export default function Leads() {
  /** CRUD interface for managing leads. */
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ name: '', email: '', status: 'new' });
  const [editing, setEditing] = useState(null);
  const [error, setError] = useState('');

  const load = async () => {
    try {
      const res = await api.leads.list();
      setItems(Array.isArray(res) ? res : (res?.items || []));
    } catch (e) {
      setItems([]);
    }
  };

  useEffect(() => { load(); }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      if (editing) {
        await api.leads.update(editing.id, form);
      } else {
        await api.leads.create(form);
      }
      setForm({ name: '', email: '', status: 'new' });
      setEditing(null);
      load();
    } catch (e) {
      setError(e?.message || 'Save failed');
    }
  };

  const onEdit = (item) => {
    setEditing(item);
    setForm({ name: item.name || '', email: item.email || '', status: item.status || 'new' });
  };

  const onDelete = async (id) => {
    if (!window.confirm('Delete this lead?')) return;
    try {
      await api.leads.remove(id);
      load();
    } catch (e) {
      setError(e?.message || 'Delete failed');
    }
  };

  return (
    <>
      <h1 className="page-title">Leads</h1>
      <p className="page-subtitle">Capture and manage potential customers.</p>
      <div className="card-grid">
        <Card className="h6" title={editing ? 'Edit Lead' : 'New Lead'}>
          <form className="form" onSubmit={onSubmit}>
            <input
              className="input"
              placeholder="Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
            <input
              className="input"
              placeholder="Email"
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
            <select
              className="select"
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
            >
              <option value="new">New</option>
              <option value="contacted">Contacted</option>
              <option value="qualified">Qualified</option>
              <option value="lost">Lost</option>
            </select>
            <div className="row">
              <button className="btn btn-primary" type="submit">
                {editing ? 'Update Lead' : 'Add Lead'}
              </button>
              {editing && (
                <button className="btn" type="button" onClick={() => { setEditing(null); setForm({ name: '', email: '', status: 'new' }); }}>
                  Cancel
                </button>
              )}
            </div>
            {error && <p style={{ color: 'var(--danger)' }}>{error}</p>}
          </form>
        </Card>

        <Card className="h6" title="Leads">
          <table className="table">
            <thead>
              <tr><th>Name</th><th>Email</th><th>Status</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {items.map((it) => (
                <tr key={it.id || `${it.email}-${it.name}`}>
                  <td>{it.name}</td>
                  <td>{it.email}</td>
                  <td>{it.status}</td>
                  <td className="row">
                    <button className="btn" onClick={() => onEdit(it)}>Edit</button>
                    <button className="btn" onClick={() => onDelete(it.id)}>Delete</button>
                  </td>
                </tr>
              ))}
              {items.length === 0 && (
                <tr><td colSpan="4">No leads yet.</td></tr>
              )}
            </tbody>
          </table>
        </Card>
      </div>
    </>
  );
}
