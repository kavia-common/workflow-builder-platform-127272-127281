import React from 'react';

// PUBLIC_INTERFACE
export default function NotFound() {
  /** Fallback page for unknown routes. */
  return (
    <div>
      <h1 className="page-title">Page not found</h1>
      <p className="page-subtitle">The page you are looking for does not exist.</p>
    </div>
  );
}
