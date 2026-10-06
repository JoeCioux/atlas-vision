import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Image as ImageIcon } from 'lucide-react';
import './Overview.css';

// Components
import AtlasCore from '../components/home/AtlasCore';
import GapVisualization from '../components/home/GapVisualization';
import CLISimulator from '../components/home/CLISimulator';

// Assets
import imgMarket from '../assets/market_scene.png';
import imgTextile from '../assets/textile_fashion.png';
import imgTransport from '../assets/everyday_transport.png';

const HERO_DEMOS = [
  { lang: 'Yoruba', text: 'Ọjà gbangba tí ó kún fún àwọn oníṣòwò...', greeting: 'Báwo ni' },
  { lang: 'Igbo', text: 'Ahịa mepere emepe ebe ndị na-ere ahịa...', greeting: 'Ndewo' },
  { lang: 'Hausa', text: 'Kasuwar buɗe wadda ke cike da masu sayarwa...', greeting: 'Sannu' }
];

const Overview = () => {
  const [demoIndex, setDemoIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setDemoIndex((prev) => (prev + 1) % HERO_DEMOS.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const currentDemo = HERO_DEMOS[demoIndex];
  
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  return (
    <div className="page-wrapper">
      
      {/* Adire Pattern Background Overlay */}
      <div className="global-pattern-overlay"></div>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="hero-title">
                TEACHING AI <span className="text-accent">TO SEE.</span>
              </h1>
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="hero-subtitle text-secondary mt-4"
            >
              In the languages of Nigeria.
            </motion.h2>

            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="hero-description mt-6"
            >
              Show it an image. Ask in English. Get the answer back in Igbo, Hausa or Yoruba.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="hero-actions mt-8"
            >
              <Link to="/playground" className="btn-primary">
                Try Atlas <ArrowRight size={16} />
              </Link>
              <Link to="/architecture" className="btn-secondary">
                Explore the Architecture
              </Link>
            </motion.div>
          </div>
          
          <div className="hero-visual">
            <div 
              className="hero-demo-card glass-panel"
              onMouseMove={handleMouseMove}
              style={{
                '--mouse-x': `${mousePos.x}px`,
                '--mouse-y': `${mousePos.y}px`
              }}
            >
              <div className="demo-header flex justify-between items-center">
                <span className="tech-label text-accent">LIVE INFERENCE</span>
                <AnimatePresence mode="wait">
                  <motion.span 
                    key={currentDemo.lang}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="tech-label text-gold"
                  >
                    {currentDemo.greeting}
                  </motion.span>
                </AnimatePresence>
              </div>
              <div className="demo-image-container">
                <img src={imgMarket} alt="Demo scene" className="demo-image" />
                <div className="demo-scanline"></div>
              </div>
              <div className="demo-output-area">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentDemo.lang}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="demo-text-block"
                  >
                    <span className="tech-label text-secondary block mb-2">{currentDemo.lang} OUTPUT</span>
                    <p className="demo-typing-text">{currentDemo.text}</p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Problem */}
      <section className="problem-section bg-pattern">
        <div className="container">
          <div className="editorial-statement">
            <h2 className="editorial-title">AI can see the world.<br/>But whose world does it understand?</h2>
            <div className="problem-flow">
              <div className="flow-step">
                <span className="tech-label">CURRENT VLM</span>
                <p>Predominantly English visual experience.</p>
              </div>
              <div className="flow-arrow">→</div>
              <div className="flow-step">
                <span className="tech-label">DATA SCARCITY</span>
                <p>Native-language image-caption data is scarce.</p>
              </div>
              <div className="flow-arrow">→</div>
              <div className="flow-step highlight-step">
                <span className="tech-label text-accent">THE GAP</span>
                <p>N-ATLAS understands Nigerian languages, but cannot see.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cinematic Transition */}
      <section className="cinematic-section">
        <div className="container cinematic-container">
          <GapVisualization />
        </div>
      </section>

      {/* Nigerian Vision Gallery */}
      <section className="vision-gallery-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">SAME VISION. DIFFERENT VOICE.</h2>
            <p className="section-subtitle mt-4">Understanding cultural context through native languages.</p>
          </div>
          <div className="gallery-grid">
            <div className="gallery-card">
              <div className="gallery-image-wrapper">
                <img src={imgMarket} alt="Market Scene" className="gallery-img" />
                <div className="gallery-img-overlay">
                  <span className="tech-label text-white">MARKET SCENE</span>
                </div>
              </div>
              <div className="gallery-caption mono text-secondary mt-3 flex gap-2 items-start text-left">
                <span className="lang-badge flex-shrink-0" style={{ backgroundColor: 'rgba(52, 168, 83, 0.1)', color: 'var(--color-lang-ig)', borderColor: 'var(--color-lang-ig)' }}>IG</span>
                <span>Ahịa mepere emepe ebe ndị na-ere ahịa na-ere mkpụrụ osisi...</span>
              </div>
            </div>
            <div className="gallery-card">
              <div className="gallery-image-wrapper">
                <img src={imgTextile} alt="Textile Fashion" className="gallery-img" />
                <div className="gallery-img-overlay">
                  <span className="tech-label text-white">TEXTILE / FASHION</span>
                </div>
              </div>
              <div className="gallery-caption mono text-secondary mt-3 flex gap-2 items-start text-left">
                <span className="lang-badge flex-shrink-0" style={{ backgroundColor: 'rgba(235, 122, 52, 0.1)', color: 'var(--color-lang-yo)', borderColor: 'var(--color-lang-yo)' }}>YO</span>
                <span>Aṣọ aláràbarà tí a hun pẹ̀lú ọgbọ́n iṣẹ́ ọnà ìbílẹ̀...</span>
              </div>
            </div>
            <div className="gallery-card">
              <div className="gallery-image-wrapper active-card">
                <img src={imgTransport} alt="Everyday Transport" className="gallery-img" />
                <div className="gallery-img-overlay">
                  <span className="tech-label text-white">EVERYDAY TRANSPORT</span>
                </div>
              </div>
              <div className="gallery-caption mono text-secondary mt-3 flex gap-2 items-start text-left">
                <span className="lang-badge flex-shrink-0" style={{ backgroundColor: 'rgba(66, 133, 244, 0.1)', color: 'var(--color-lang-ha)', borderColor: 'var(--color-lang-ha)' }}>HA</span>
                <span>Babura da ke ɗaukar fasinjoji a kan titi mai cike da mutane...</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CLI as Technical Supporting Content */}
      <section className="technical-preview-section bg-secondary">
        <div className="container">
          <div className="split-layout">
            <div className="split-content flex-col justify-center">
              <h3 className="mb-4 text-3xl">ONE INTERFACE. TWO WORLDS.</h3>
              <p className="text-secondary mb-8">Explore the vision-language cascade programmatically. Atlas Vision provides a unified programmatic interface to interact with the underlying cascade.</p>
              <Link to="/architecture" className="btn-secondary self-start">View Architecture</Link>
            </div>
            <div className="split-visual">
              <CLISimulator />
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="final-cta-section bg-pattern">
        <div className="container">
          <div className="final-cta-content glass-panel p-12 text-center rounded-2xl">
            <h2 className="mb-4">GIVE IT SOMETHING TO SEE.</h2>
            <p className="text-secondary text-lg mb-8">Explore Atlas Vision and experience the cascade.</p>
            <div className="flex justify-center">
              <Link to="/playground" className="btn-primary">
                Open Playground
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Overview;
