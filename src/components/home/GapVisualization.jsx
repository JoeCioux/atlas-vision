import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import './GapVisualization.css';

const GapVisualization = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });

  return (
    <div className="gap-vis-container" ref={containerRef}>
      <div className="cinematic-text-sequence">
        <motion.div 
          className="cinematic-label tech-label"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1 }}
        >
          N-ATLAS
        </motion.div>
        
        <motion.h2 
          className="cinematic-phrase"
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          It could speak.
        </motion.h2>
        
        <motion.h2 
          className="cinematic-phrase text-secondary"
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 1, delay: 1.5 }}
        >
          But it couldn't see.
        </motion.h2>
      </div>

      <div className="connection-animation">
        <motion.div 
          className="node n-atlas-node glass-panel"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1 }}
        >
          <span className="tech-label">LANGUAGE</span>
        </motion.div>

        <motion.div 
          className="connection-line-wrapper"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1, delay: 2.5 }}
        >
          <motion.div 
            className="connection-line-fill"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 1.2, delay: 2.5, ease: "easeInOut" }}
          />
          <div className="connection-particles"></div>
        </motion.div>

        <motion.div 
          className="node siglip-node glass-panel"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.8, delay: 2.2, type: 'spring', bounce: 0.4 }}
        >
          <span className="tech-label text-accent">VISION</span>
        </motion.div>
      </div>

      <motion.div 
        className="cinematic-finale"
        initial={{ opacity: 0, y: 10 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
        transition={{ duration: 1, delay: 4 }}
      >
        <h1 className="cinematic-title gradient-text">ATLAS VISION</h1>
        <p className="cinematic-subtitle">WE GAVE N-ATLAS EYES. NOW IT CAN SEE.</p>
      </motion.div>
    </div>
  );
};

export default GapVisualization;
