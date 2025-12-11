import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import profile from "../assets/profile.jpg";
import "./Home.css";

const SOLVED_PROBLEMS_KEY = "solvedProblems";
const GREEN_PROFILE_THRESHOLD = 5;

export default function Home() {
  const [solvedProblems, setSolvedProblems] = useState(0);
  const [greenProfileAchieved, setGreenProfileAchieved] = useState(false);

  useEffect(() => {
    const storedSolvedProblems = localStorage.getItem(SOLVED_PROBLEMS_KEY);
    if (storedSolvedProblems) {
      const count = parseInt(storedSolvedProblems, 10);
      setSolvedProblems(count);
      setGreenProfileAchieved(count >= GREEN_PROFILE_THRESHOLD);
    }
  }, []);

  const handleSolveProblem = () => {
    const newSolvedProblems = solvedProblems + 1;
    setSolvedProblems(newSolvedProblems);
    localStorage.setItem(SOLVED_PROBLEMS_KEY, newSolvedProblems.toString());

    if (newSolvedProblems >= GREEN_PROFILE_THRESHOLD && !greenProfileAchieved) {
      setGreenProfileAchieved(true);
      alert("Congratulations! You've achieved a Green Profile!");
    }
  };

  return (
    <section className="home">
      <motion.div
        className="intro"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h3>Arshad Rafey Siddiqui</h3>
        <p className="role">Software Engineer • AI Enthusiast • Cloud Engineer</p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          This is a test to confirm deployment. <br />
          If you see this, the deployment is working.
        </motion.h1>

        {/* Achievement Section */}
        <div className="achievement-section">
          <p>Solved Problems: {solvedProblems}</p>
          <button onClick={handleSolveProblem}>Solve Another Problem</button>
          {greenProfileAchieved && (
            <p className="green-profile-status">✅ Green Profile Achieved!</p>
          )}
        </div>

      </motion.div>

      <motion.div
        className="profile-pic"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6, duration: 0.7 }}
      >
        <img src={profile} alt="Profile" />
      </motion.div>
    </section>
  );
}
