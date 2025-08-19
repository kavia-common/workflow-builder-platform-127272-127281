import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import { AuthProvider, useAuth } from './context/AuthContext';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import Dashboard from './pages/Dashboard';
import WorkflowBuilder from './pages/WorkflowBuilder';
import Leads from './pages/Leads';
import Invoices from './pages/Invoices';
import Payments from './pages/Payments';
import Integrations from './pages/Integrations';
import Settings from './pages/Settings';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';

// PUBLIC_INTERFACE
function ProtectedLayout() {
  /** A layout that renders the sidebar, topbar and an outlet for protected pages. */
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="app-shell">
      <Sidebar />
      <Topbar />
      <main className="content">
        <div className="page">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/workflow" element={<WorkflowBuilder />} />
            <Route path="/leads" element={<Leads />} />
            <Route path="/invoices" element={<Invoices />} />
            <Route path="/payments" element={<Payments />} />
            <Route path="/integrations" element={<Integrations />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}

// PUBLIC_INTERFACE
function PublicLayout() {
  /** Public routes for unauthenticated users: login and register. */
  const { user } = useAuth();
  if (user) return <Navigate to="/" replace />;
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

// PUBLIC_INTERFACE
function App() {
  /** Root component providing Auth context and all routes. */
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login/*" element={<PublicLayout />} />
          <Route path="/register/*" element={<PublicLayout />} />
          <Route path="/*" element={<ProtectedLayout />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
