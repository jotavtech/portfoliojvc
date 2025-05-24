import React from "react";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <motion.section
      id="home"
      className="min-h-screen relative flex justify-center items-center overflow-hidden bg-black"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      style={{
        backgroundImage: `url('/path-to-your-image.webp')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

      {/* Main Content */}
      <div className="z-10 w-full flex flex-col items-center justify-center text-center px-4">
        <h1
          className="font-black text-white drop-shadow-lg leading-none"
          style={{
            fontSize: "clamp(4rem, 20vw, 12rem)",
            lineHeight: 1,
            textShadow: "0 6px 30px rgba(0, 0, 0, 0.5)",
            userSelect: "none",
            margin: 0,
            padding: 0,
          }}
          aria-label="João Vitor Chaves"
        >
          <span className="block">JOÃO</span>
          <span
            className="block"
            style={{
              color: "#FF4500",
              filter: "brightness(1.3) contrast(1.1)",
              textShadow: "0 6px 30px rgba(255, 69, 0, 0.6)",
            }}
          >
            CHAVES
          </span>
        </h1>
      </div>
    </motion.section>
  );
}