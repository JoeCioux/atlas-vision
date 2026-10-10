import React from 'react';
import { motion } from 'framer-motion';
import './RoadmapTrack.css';

const TRACK = [
  {
    phase: 'Today',
    title: 'Intermediate representation',
    text: 'Vision → semantic representation → African language. Shipped and measurable.',
    state: 'shipped',
  },
  {
    phase: 'Next',
    title: 'Direct transfer',
    text: 'Vision → African language, with less dependence on the intermediate step.',
    state: 'active',
  },
  {
    phase: 'Long term',
    title: 'Native multimodal training',
    text: 'Models trained on native African-language visual data from the start.',
    state: 'future',
  },
];

/**
 * Roadmap track: Today → Next → Long term, framed as a research frontier.
 */
const RoadmapTrack = () => {
  return (
    <div className="roadmap-track">
      <div className="roadmap-line" aria-hidden="true">
        <motion.div
          className="roadmap-line-fill"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
        />
      </div>
      <div className="roadmap-nodes">
        {TRACK.map((node, index) => (
          <motion.div
            className="roadmap-node"
            key={node.phase}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, delay: 0.2 + index * 0.25 }}
          >
            <span className={`roadmap-marker ${node.state}`} aria-hidden="true"></span>
            <span className="tech-label roadmap-phase">{node.phase}</span>
            <h3 className={`roadmap-title ${node.state === 'future' ? 'gradient-text' : ''}`}>
              {node.title}
            </h3>
            <p className="roadmap-text">{node.text}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default RoadmapTrack;
