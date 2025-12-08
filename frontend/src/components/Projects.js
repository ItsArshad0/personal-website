import React from "react";

export default function Projects() {
  return (
    <section id="projects" style={{ padding: "40px" }}>
      <h2>Projects</h2>
      <div>
        <h3>AI Image Generation & Segmentation</h3>
        <p>Built a backend using FastAPI for text-to-image generation and image segmentation <br></br>
           Integrated Stable Diffusion and SAM (Segment Anything Model).</p>
        <div style={{ display: 'flex', gap: '10px', marginTop: '10px', flexWrap: 'wrap' }}>
          <img src="/backend.jpeg" alt="AI generated image" style={{ maxWidth: '400px', height: 'auto', border: '1px solid #ddd', borderRadius: '4px' }} />
          <img src="/backend-seg.jpeg" alt="AI generated image segmented" style={{ maxWidth: '400px', height: 'auto', border: '1px solid #ddd', borderRadius: '4px' }} />
        </div>

        <h3>Music Recommendation System v1</h3>
        <p>Developed an improved music recommender using Content-Based + Collaborative Filtering <br></br>
           Enhanced feature engineering and optimized recommendation performance.</p>
        <div style={{ marginTop: '10px' }}>
          <img src="/v1.jpeg" alt="Music Recommendation System" style={{ maxWidth: '400px', height: 'auto', border: '1px solid #ddd', borderRadius: '4px' }} />
        </div>
      </div>
      <div>
        <h3>Real-Time Speech Recognition & Translator</h3>
        <p>Built a voice translator with SpeechRecognition, GoogleTrans, and pyttsx3 <br></br>
            Converts speech → text → translated output → spoken audio in real-time</p>
        <div style={{ marginTop: '10px' }}>
          <img src="/translator.jpeg" alt="Translator project" style={{ maxWidth: '400px', height: 'auto', border: '1px solid #ddd', borderRadius: '4px' }} />
        </div>
        </div>
         <div>
        <h3>Resume Screening Tool</h3>
        <p>Created a Python + Streamlit app to analyze resume content and formatting<br></br>

          Provides instant feedback on keywords, readability, and structure </p>
        </div>

      <div style={{ marginTop: 30 }}>
        <h3>Project demo / videos</h3>
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
          <video
            style={{ width: "100%", height: "100%", border: "none" }}
            controls
            autoPlay
            muted
          >
            <source src="/project-demo.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </section>
  );
}
