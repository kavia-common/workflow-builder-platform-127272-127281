/**
 * API client utilities for REST calls to the backend.
 * Uses environment variables for configuration and automatically attaches Authorization headers when a token is present.
 */

import { getToken } from './storage';
import { config } from './env';

const BASE_URL = config.API_BASE_URL;

// PUBLIC_INTERFACE
export async function apiFetch(path, options = {}) {
  /** Wrapper around fetch that:
   * - prefixes the BASE_URL
   * - sets JSON headers
   * - attaches Authorization header if available
   * - throws on non-2xx responses with parsed error
   */
  const token = getToken();
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  const response = await fetch(`${BASE_URL}${path}`, { ...options, headers });
  const contentType = response.headers.get('Content-Type') || '';

  let data = null;
  if (contentType.includes('application/json')) {
    data = await response.json().catch(() => null);
  } else {
    data = await response.text().catch(() => null);
  }

  if (!response.ok) {
    const message = (data && (data.message || data.error)) || response.statusText || 'Request failed';
    const error = new Error(message);
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data;
}

// PUBLIC_INTERFACE
export const api = {
  /** Grouped API calls for the app domain. */
  auth: {
    // PUBLIC_INTERFACE
    async login(email, password) {
      /** Login using email and password. Returns { token, user }. */
      return apiFetch('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) });
    },
    // PUBLIC_INTERFACE
    async register(name, email, password) {
      /** Register a new user. Returns { token, user }. */
      return apiFetch('/auth/register', { method: 'POST', body: JSON.stringify({ name, email, password }) });
    },
    // PUBLIC_INTERFACE
    async me() {
      /** Returns the current authenticated user profile. */
      return apiFetch('/auth/me', { method: 'GET' });
    },
  },
  workflows: {
    // PUBLIC_INTERFACE
    async generateFromDescription(description) {
      /** Submit a free-text workflow description to generate a new app. */
      return apiFetch('/workflows/generate', { method: 'POST', body: JSON.stringify({ description }) });
    },
  },
  apps: {
    // PUBLIC_INTERFACE
    async list() {
      /** Returns the list of generated apps for the user. */
      return apiFetch('/apps', { method: 'GET' });
    },
  },
  leads: {
    // PUBLIC_INTERFACE
    async list() { return apiFetch('/leads', { method: 'GET' }); },
    // PUBLIC_INTERFACE
    async create(payload) { return apiFetch('/leads', { method: 'POST', body: JSON.stringify(payload) }); },
    // PUBLIC_INTERFACE
    async update(id, payload) { return apiFetch(`/leads/${id}`, { method: 'PUT', body: JSON.stringify(payload) }); },
    // PUBLIC_INTERFACE
    async remove(id) { return apiFetch(`/leads/${id}`, { method: 'DELETE' }); },
  },
  invoices: {
    // PUBLIC_INTERFACE
    async list() { return apiFetch('/invoices', { method: 'GET' }); },
    // PUBLIC_INTERFACE
    async create(payload) { return apiFetch('/invoices', { method: 'POST', body: JSON.stringify(payload) }); },
    // PUBLIC_INTERFACE
    async update(id, payload) { return apiFetch(`/invoices/${id}`, { method: 'PUT', body: JSON.stringify(payload) }); },
    // PUBLIC_INTERFACE
    async remove(id) { return apiFetch(`/invoices/${id}`, { method: 'DELETE' }); },
  },
  payments: {
    // PUBLIC_INTERFACE
    async list() { return apiFetch('/payments', { method: 'GET' }); },
    // PUBLIC_INTERFACE
    async create(payload) { return apiFetch('/payments', { method: 'POST', body: JSON.stringify(payload) }); },
    // PUBLIC_INTERFACE
    async update(id, payload) { return apiFetch(`/payments/${id}`, { method: 'PUT', body: JSON.stringify(payload) }); },
    // PUBLIC_INTERFACE
    async remove(id) { return apiFetch(`/payments/${id}`, { method: 'DELETE' }); },
  },
  integrations: {
    // PUBLIC_INTERFACE
    async status() { return apiFetch('/integrations/status', { method: 'GET' }); },
    // PUBLIC_INTERFACE
    async connectStripe() { return apiFetch('/integrations/stripe/connect', { method: 'POST' }); },
    // PUBLIC_INTERFACE
    async disconnectStripe() { return apiFetch('/integrations/stripe/disconnect', { method: 'POST' }); },
    // PUBLIC_INTERFACE
    async connectQuickBooks() { return apiFetch('/integrations/quickbooks/connect', { method: 'POST' }); },
    // PUBLIC_INTERFACE
    async disconnectQuickBooks() { return apiFetch('/integrations/quickbooks/disconnect', { method: 'POST' }); },
  }
};
