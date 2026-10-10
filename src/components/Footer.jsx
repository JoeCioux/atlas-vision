import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <h2 className="brand-logo">ATLAS VISION</h2>
            <p className="brand-tagline">An open multimodal stack for native African languages.</p>
            <div className="footer-credits">
              <p className="tech-label">Built on N-ATLAS, SigLIP2 and the open-source ML ecosystem.</p>
            </div>
          </div>
          
          <div className="footer-links-group">
            <h3 className="footer-heading">Project</h3>
            <Link to="/" className="footer-link">Overview</Link>
            <Link to="/architecture" className="footer-link">Architecture</Link>
            <Link to="/playground" className="footer-link">Playground</Link>
            <Link to="/evaluation" className="footer-link">Evaluation</Link>
          </div>
          
          <div className="footer-links-group">
            <h3 className="footer-heading">Research</h3>
            <Link to="/architecture" className="footer-link">Approach & Method</Link>
            <Link to="/evaluation" className="footer-link">Benchmarks</Link>
            <a href="#roadmap" className="footer-link">Limitations & Roadmap</a>
            <a href="https://huggingface.co/Modularcomputing/AtlasVision" target="_blank" rel="noopener noreferrer" className="footer-link">Weights & Model Card</a>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p className="footer-copyright">&copy; {new Date().getFullYear()} Atlas Vision.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
