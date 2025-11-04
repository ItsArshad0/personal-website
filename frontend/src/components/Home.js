import React from "react";
import { motion } from "framer-motion";
import profile from "../assets/profile.jpg";
import "./Home.css";

export default function Home() {
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
          Hey there! I’m a creative <br />
          full-stack and AI developer <br />
          crafting intelligent web products.
        </motion.h1>
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
