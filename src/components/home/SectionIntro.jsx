import React from 'react';
import './SectionIntro.css';

/**
 * Editorial section header: mono number + label on the left,
 * Fraunces title and optional deck on the right.
 */
const SectionIntro = ({ number, label, title, deck }) => {
  return (
    <div className="section-intro">
      <div className="intro-meta">
        <span className="intro-number mono">{number}</span>
        <span className="tech-label intro-label">{label}</span>
      </div>
      <div className="intro-content">
        <h2 className="intro-title">{title}</h2>
        {deck && <p className="intro-deck">{deck}</p>}
      </div>
    </div>
  );
};

export default SectionIntro;
