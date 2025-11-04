import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "./Hero.css";

export default function Hero() {
  return (
    <motion.div
      className="hero"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      <h1><span>Architecting</span> better <br /> <span>clouds, softwares.</span></h1>
      <p>
        I’m <strong>Arshad Rafey Siddiqui</strong> — a software developer passionate about
        building beautiful, fast, and responsive cloud environments.
      </p>
      <div className="cta-buttons">
        <Link to="/projects">
          <button className="primary">View My Work</button>
        </Link>
        <Link to="/contact">
          <button className="secondary">Connect with Me</button>
        </Link>
      </div>
    </motion.div>
  );
}