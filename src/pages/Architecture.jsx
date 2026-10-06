import React from 'react';
import ArchitectureFlow from '../components/home/ArchitectureFlow';
import './Architecture.css';

const Architecture = () => {
  return (
    <div className="page-wrapper">
      <div className="container architecture-page-container">
        
        <header className="arch-header">
          <h1 className="section-title">THE ATLAS CASCADE</h1>
          <p className="section-subtitle">Bridging vision and Nigerian languages through an optimized pipeline.</p>
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
