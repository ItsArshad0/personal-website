import React from "react";
export default function Contact() {
  return (
    <div className="section">
      <h2>Connect with Me</h2>
      <p>
        Email: {
          /* Opens Gmail compose in a new tab (falls back to mail client if not logged into Gmail) */
        }
        <a
          href="https://mail.google.com/mail/?view=cm&fs=1&to=arshadsiddiqui153@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          arshadsiddiqui153@gmail.com
        </a>
      </p>
      <p>
        LinkedIn: {
          /* External LinkedIn profile */
        }
        <a
          href="https://www.linkedin.com/in/arshad-siddiqui-/"
          target="_blank"
          rel="noopener noreferrer"
        >
          linkedin.com/in/arshad-siddiqui-/
        </a>
      </p>
      <p>
        GitHub: {
          /* External GitHub profile */
        }
        <a
          href="https://github.com/itsArshad0"
          target="_blank"
          rel="noopener noreferrer"
        >
          github.com/itsArshad0
        </a>
      </p>
    </div>
  );
}