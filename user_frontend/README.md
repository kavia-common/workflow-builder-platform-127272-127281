# Workflow Builder - user_frontend

A modern, minimalistic React frontend for SMB owners to describe workflows and operate generated apps.  
Layout includes a sidebar, top bar, and card-based modules using a light theme with the following palette:
- Primary: #2980b9
- Secondary: #27ae60
- Accent: #f39c12

## Features

- Workflow description input to generate new apps
- Dashboard of generated apps and KPIs
- CRUD interfaces for Leads, Invoices, and Payments
- Integration management for Stripe and QuickBooks
- Authentication and user management

## Getting Started

1. Copy the environment example and set values:
   cp .env.example .env
2. Install dependencies:
   npm install
3. Start the dev server:
   npm start

## Environment Variables

Define in `.env`:
- REACT_APP_API_BASE_URL: Base URL for backend API (e.g., http://localhost:8000/api)
- REACT_APP_STRIPE_PUBLIC_KEY: Optional Stripe publishable key (if needed by client flows)
- REACT_APP_QUICKBOOKS_CLIENT_ID: Optional QuickBooks Client ID for OAuth flows (if required)
- REACT_APP_SITE_URL: Public site URL for redirects (defaults to window.location.origin)

## Project Structure

- src/
  - components/ (Sidebar, Topbar, Card)
  - context/ (AuthContext)
  - pages/ (Dashboard, WorkflowBuilder, Leads, Invoices, Payments, Integrations, Settings, Login, Register, NotFound)
  - services/ (api, env, storage)
  - App.js, App.css, index.js, index.css

## Notes

- All API endpoints use REACT_APP_API_BASE_URL and attach the Bearer token from localStorage when available.
- Authentication assumes the backend exposes the following endpoints:
  - POST /auth/login
  - POST /auth/register
  - GET  /auth/me
- CRUD endpoints assumed:
  - /leads, /invoices, /payments with GET/POST/PUT/DELETE
- Integration endpoints assumed:
  - /integrations/status
  - /integrations/stripe/connect, /integrations/stripe/disconnect
  - /integrations/quickbooks/connect, /integrations/quickbooks/disconnect

Adjust endpoints as needed to match your backend.

## Scripts

- npm start
- npm run build
- npm test

## License

MIT
