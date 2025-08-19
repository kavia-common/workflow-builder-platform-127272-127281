import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Card from '../components/Card';
import { useAuth } from '../context/AuthContext';

// PUBLIC_INTERFACE
export default function Login() {
  /** Login form for the application. */
  const { login } = useAuth();
  const nav = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr('');
    setLoading(true);
    try {
      await login(form.email, form.password);
      nav('/', { replace: true });
    } catch (e) {
      setErr(e?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'grid', placeItems: 'center', minHeight: '100vh', background: '#f7f9fb', padding: 16 }}>
      <div style={{ maxWidth: 420, width: '100%' }}>
        <Card title="Sign in">
          <form className="form" onSubmit={onSubmit}>
            <input
              className="input"
              placeholder="Email"
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
            <input
              className="input"
              placeholder="Password"
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
            <button className="btn btn-primary" type="submit" disabled={loading}>
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
            {err && <p style={{ color: 'var(--danger)' }}>{err}</p>}
          </form>
          <p className="mt-12" style={{ color: '#6b7280' }}>
            No account? <Link to="/register">Create one</Link>
          </p>
        </Card>
      </div>
    </div>
  );
}
