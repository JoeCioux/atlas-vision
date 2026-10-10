import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import './StackStrip.css';

const STACK = [
  { name: 'Research', note: 'Cascaded VLM' },
  { name: 'Model', note: 'Atlas Vision' },
  { name: 'SDK', note: 'Python' },
  { name: 'API', note: 'REST inference' },
  { name: 'Playground', note: 'In the browser' },
  { name: 'Open Weights', note: 'Hugging Face', url: 'https://huggingface.co/Modularcomputing/AtlasVision' },
];

/**
 * Thin band directly under the hero: the stack ladder
 * Research → Model → SDK → API → Playground → Open Weights.
 */
const StackStrip = () => {
  return (
    <section className="stack-strip-section">
      <div className="container">
        <motion.p
          className="stack-manifesto"
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.7 }}
        >
          One model. One SDK. One API — an open stack for building
          African-language vision applications.
        </motion.p>

        <div className="stack-row">
          {STACK.map((item, index) => (
            <React.Fragment key={item.name}>
              {index > 0 && (
                <ChevronRight size={14} className="stack-chevron" aria-hidden="true" />
              )}
              {item.url ? (
                <a href={item.url} target="_blank" rel="noopener noreferrer" className="stack-item cursor-pointer">
                  <span className="stack-name mono">{item.name}</span>
                  <span className="stack-note">{item.note}</span>
                </a>
              ) : (
                <div className="stack-item">
                  <span className="stack-name mono">{item.name}</span>
                  <span className="stack-note">{item.note}</span>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StackStrip;
