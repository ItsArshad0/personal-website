import React from "react";

export default function Projects() {
  return (
    <section id="projects" style={{ padding: "40px" }}>
      <h2>Projects</h2>
      <div>
        <h3>🧠 RAG-Based Q&A Bot</h3>
        <p>Built using LangChain, Gemini AI, and FAISS.</p>

        <h3>📷 CNN Image Classifier</h3>
        <p>Multi-category TIFF image classification using TensorFlow/Keras.</p>
      </div>

      <div style={{ marginTop: 30 }}>
        <h3>Project demo / videos</h3>
        <p>
          Below is a placeholder where you can embed a demo video (YouTube,
          Vimeo, or direct video file). Replace the iframe src with your video
          link.
        </p>
        <div
          className="video-placeholder"
          style={{
            width: "100%",
            maxWidth: 900,
            height: 500,
            background: "#000",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            borderRadius: 8,
            overflow: "hidden",
          }}
        >
          {/* Example embed - replace src with your video URL */}
          <iframe
            title="project-demo"
            src="https://www.youtube.com/embed/dQw4w9WgXcQ"
            style={{ width: "100%", height: "100%", border: "none" }}
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </section>
  );
}
