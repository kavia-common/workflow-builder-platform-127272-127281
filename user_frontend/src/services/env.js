/**
 * Environment configuration loader for the frontend.
 * All values are sourced from process.env to avoid hard-coding secrets or URLs.
 */

// PUBLIC_INTERFACE
export const config = {
  /** App configuration derived from environment variables. */
  API_BASE_URL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000/api',
  STRIPE_PUBLIC_KEY: process.env.REACT_APP_STRIPE_PUBLIC_KEY || '',
  QUICKBOOKS_CLIENT_ID: process.env.REACT_APP_QUICKBOOKS_CLIENT_ID || '',
  SITE_URL: process.env.REACT_APP_SITE_URL || window.location.origin,
};
