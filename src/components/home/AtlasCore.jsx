import React from 'react';
import { motion } from 'framer-motion';
import { ImageIcon, Globe } from 'lucide-react';
import './AtlasCore.css';

const AtlasCore = () => {
  return (
    <div className="atlas-core-container">
      <div className="core-system active">
        
        {/* Animated Map/Globe motif in background */}
        <div className="globe-motif">
          <Globe size={180} strokeWidth={1} color="var(--color-border-strong)" />
        </div>

        <div className="core-ring outer-ring"></div>
        <div className="core-ring inner-ring"></div>
        
        {/* Central Node */}
        <div className="core-center">
          <ImageIcon size={32} className="text-accent" />
        </div>

        {/* Floating Data Particles */}
        <div className="data-particle" style={{ animation: 'orbit 4s linear infinite' }}></div>
        <div className="data-particle" style={{ animation: 'orbit 4s linear infinite reverse', animationDelay: '-2s' }}></div>

        {/* Labels - Redesigned to flow from center to Yoruba/Hausa/Igbo bubbles */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1 }}
          className="core-label input-bubble"
        >
          <span className="tech-label text-primary">IMAGE INPUT</span>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.5 }}
          className="core-label english-bubble"
        >
          <span className="tech-label text-secondary">ENGLISH GROUNDING</span>
        </motion.div>

        <div className="target-bubbles">
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 2 }}
            className="core-label igbo-bubble"
          >
            <div className="lang-dot" style={{ backgroundColor: 'var(--color-lang-ig)' }}></div>
            <span className="tech-label text-primary">IGBO</span>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 2.2 }}
            className="core-label hausa-bubble"
          >
            <div className="lang-dot" style={{ backgroundColor: 'var(--color-lang-ha)' }}></div>
            <span className="tech-label text-primary">HAUSA</span>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 2.4 }}
            className="core-label yoruba-bubble"
          >
            <div className="lang-dot" style={{ backgroundColor: 'var(--color-lang-yo)' }}></div>
            <span className="tech-label text-primary">YORUBA</span>
          </motion.div>
        </div>

      </div>
    </div>
  );
};

export default AtlasCore;
