/**
 * Simple storage helpers to persist tokens and user state.
 */

const TOKEN_KEY = 'auth_token';

// PUBLIC_INTERFACE
export function getToken() {
  /** Returns the persisted JWT token if present. */
  try { return localStorage.getItem(TOKEN_KEY); } catch { return null; }
}

// PUBLIC_INTERFACE
export function setToken(token) {
  /** Stores the JWT token in localStorage. */
  try { localStorage.setItem(TOKEN_KEY, token); } catch { /* ignore */ }
}

// PUBLIC_INTERFACE
export function clearToken() {
  /** Removes the JWT token from localStorage. */
  try { localStorage.removeItem(TOKEN_KEY); } catch { /* ignore */ }
}
