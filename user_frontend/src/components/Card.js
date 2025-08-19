import React from 'react';

// PUBLIC_INTERFACE
export default function Card({ title, children, className = '' }) {
  /** Card component with optional title. */
  return (
    <section className={`card ${className}`}>
      {title ? <h3 className="card-title">{title}</h3> : null}
      {children}
    </section>
  );
}
