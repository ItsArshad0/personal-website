// frontend/src/Certificates.js
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Certificates({ limit }) {
  const [certs, setCerts] = useState([]);
  const backend = process.env.NODE_ENV === 'production'
    ? process.env.REACT_APP_API_URL
    : "http://localhost:5000"; // Flask server

  useEffect(() => {
    fetch(`${backend}/certificates`)
      .then((res) => res.json())
      .then((data) => setCerts(data))
      .catch(console.error);
  }, [backend]);

  const displayed = typeof limit === 'number' ? certs.slice(0, limit) : certs;

  return (
    <div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "20px",
          padding: "20px",
        }}
      >
        {displayed.map((c) => (
        <div
          key={c.id}
          style={{
            border: "1px solid #ddd",
            borderRadius: "10px",
            padding: "15px",
            textAlign: "center",
            boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
          }}
        >
          <h3>{c.name || c.title || c.file}</h3>
          <iframe
            src={`${backend}/view/${c.id}`}
            title={c.name || c.title || c.file}
            style={{
              width: "100%",
              height: "400px",
              border: "none",
            }}
          ></iframe>
          <p style={{ color: "#666", fontSize: "0.9em" }}>
            View only — downloads disabled
          </p>
        </div>
        ))}
      </div>

      {typeof limit === 'number' && certs.length > limit && (
        <div style={{ padding: '0 20px 30px' }}>
          <Link to="/certificates" style={{ fontWeight: 700 }}>
            View all certificates
          </Link>
        </div>
      )}
    </div>
  );
}

// Accept an optional `limit` prop to show only the first N certificates (used on home page)
Certificates.defaultProps = {
  limit: undefined,
};
