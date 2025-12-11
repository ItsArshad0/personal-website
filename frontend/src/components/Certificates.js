// frontend/src/Certificates.js
import React from "react";
import { Link } from "react-router-dom";

// Static list of certificates with placeholder image paths
const staticCerts = [
  { id: 1, name: "AI cert OCI", image: "/images/AI cert OCI.jpg" },
  { id: 2, name: "Certificate ml", image: "/images/Certificate ml.jpg" },
  { id: 3, name: "certificate-Arshad Siddiqui", image: "/images/certificate-Arshad Siddiqui.jpg" },
  { id: 4, name: "Certificate", image: "/images/Certificate.jpg" },
  { id: 5, name: "OCI(Cert)", image: "/images/OCI(Cert).jpg" },
];

export default function Certificates({ limit }) {
  const displayed = typeof limit === 'number' ? staticCerts.slice(0, limit) : staticCerts;

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
          <h3>{c.name}</h3>
          <img
            src={c.image}
            alt={c.name}
            style={{
              width: "100%",
              height: "400px",
              objectFit: "contain",
              border: "none",
            }}
          />
        </div>
        ))}
      </div>

      {typeof limit === 'number' && staticCerts.length > limit && (
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
