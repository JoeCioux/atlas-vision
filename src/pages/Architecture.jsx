import React from 'react';
import ArchitectureFlow from '../components/home/ArchitectureFlow';
import './Architecture.css';

const Architecture = () => {
  return (
    <div className="page-wrapper">
      <div className="container architecture-page-container">
        
        <header className="arch-header">
          <h1 className="section-title">EXTENDING N-ATLAS INTO THE VISUAL DOMAIN</h1>
          <p className="section-subtitle">The full pipeline, from raw pixels to Igbo, Hausa and Yoruba — and why English sits in the middle.</p>
        </header>

        {/* ONLY The Architecture Interactive Flow */}
        <section className="architecture-flow-section">
          <ArchitectureFlow />
        </section>

      </div>
    </div>
  );
};

export default Architecture;
