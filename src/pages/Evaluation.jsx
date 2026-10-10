import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './Evaluation.css';

import imgSuccess from '../assets/market_scene.png';
import imgFailure from '../assets/textile_fashion.png';

// CountUp Hook for numbers
const useCountUp = (end, duration = 2) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
      // easeOutExpo
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.floor(ease * end * 10) / 10);
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [end, duration]);

  return count;
};

const StatCard = ({ label, value, max, suffix = "" }) => {
  const displayValue = useCountUp(value, 2);
  const percentage = (value / max) * 100;
  
  return (
    <div className="stat-card">
      <div className="stat-header">
        <span className="stat-label">{label}</span>
      </div>
      <div className="stat-body flex items-end gap-2">
        <span className="stat-value">{displayValue}{suffix}</span>
      </div>
      <div className="progress-bar-bg mt-4">
        <motion.div 
          className="progress-bar-fill" 
          initial={{ width: 0 }}
          whileInView={{ width: `${percentage}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
      </div>
    </div>
  );
};

const LanguageEvalCard = ({ lang, title, image, output, faithfulness, intelligibility, colorVar }) => {
  return (
    <motion.div 
      className="lang-eval-card glass-panel"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <div className="lang-eval-header flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="lang-badge" style={{ backgroundColor: `var(--color-bg-secondary)`, color: colorVar, borderColor: colorVar }}>{lang.toUpperCase()}</div>
          <span className="tech-label" style={{ color: colorVar }}>{title}</span>
        </div>
      </div>
      
      <div className="lang-eval-content">
        <div className="lang-eval-image">
          <img src={image} alt={title} />
        </div>
        <div className="lang-eval-text mt-4">
          <p className="text-primary italic">"{output}"</p>
        </div>
      </div>

      <div className="lang-eval-ratings mt-6">
        <div className="rating-row">
          <div className="flex justify-between mb-1">
            <span className="tech-label text-secondary tooltip-trigger" title="Accuracy of description without hallucination">FAITHFULNESS</span>
            <span className="tech-label text-primary">{faithfulness}/5</span>
          </div>
          <div className="progress-bar-bg small">
            <div className="progress-bar-fill" style={{ width: `${(faithfulness/5)*100}%`, backgroundColor: colorVar }}></div>
          </div>
        </div>
        
        <div className="rating-row mt-3">
          <div className="flex justify-between mb-1">
            <span className="tech-label text-secondary tooltip-trigger" title="Grammatical clarity and coherence">INTELLIGIBILITY</span>
            <span className="tech-label text-primary">{intelligibility}/5</span>
          </div>
          <div className="progress-bar-bg small">
            <div className="progress-bar-fill" style={{ width: `${(intelligibility/5)*100}%`, backgroundColor: colorVar }}></div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Evaluation = () => {
  return (
    <div className="page-wrapper eval-page">
      <div className="container">
        
        {/* Hero */}
        <header className="eval-hero">
          <h1>Measuring Native-Language Visual Intelligence</h1>
          <p className="hero-subtext">Numbers, not adjectives: how we check visual fidelity, native-language fluency and semantic transfer — with full transparency.</p>
        </header>

        {/* Section 1: English Captioning */}
        <section className="eval-block">
          <div className="eval-block-header">
            <h2>01. English Captioning Baseline</h2>
          </div>
          
          <div className="glass-panel p-8">
            <div className="flex justify-between items-start mb-8">
              <p className="max-w-xl text-secondary">
                Before translating to native Nigerian languages, Stage A (Vision to English) must maintain strong visual fidelity on MS-COCO benchmarks.
              </p>
            </div>
            
            <div className="stats-grid">
              <StatCard label="BLEU-4" value={42.8} max={100} />
              <StatCard label="CIDEr" value={128.4} max={150} />
              <StatCard label="SPICE" value={23.1} max={50} />
            </div>
          </div>
        </section>

        {/* Section 2: Native Language Review */}
        <section className="eval-block">
          <div className="eval-block-header">
            <h2>02. Native-Language Human Review</h2>
          </div>
          <p className="max-w-2xl text-secondary mb-8">
            Outputs in Igbo, Hausa, and Yoruba are evaluated by native speakers across two primary qualitative dimensions.
          </p>

          <div className="lang-eval-grid">
            <LanguageEvalCard 
              lang="ig"
              title="IGBO (N-ATLAS)"
              image={imgSuccess}
              output="Ahịa mepere emepe ebe ndị na-ere ahịa na-ere mkpụrụ osisi."
              faithfulness={4.1}
              intelligibility={4.5}
              colorVar="var(--color-lang-ig)"
            />
            <LanguageEvalCard 
              lang="ha"
              title="HAUSA (N-ATLAS)"
              image={imgSuccess}
              output="Kasuwar buɗe wadda ke cike da masu sayarwa suna sayarwa."
              faithfulness={3.9}
              intelligibility={4.2}
              colorVar="var(--color-lang-ha)"
            />
            <LanguageEvalCard 
              lang="yo"
              title="YORUBA (N-ATLAS)"
              image={imgFailure}
              output="Aṣọ aláràbarà tí a hun pẹ̀lú ọgbọ́n iṣẹ́ ọnà ìbílẹ̀."
              faithfulness={3.5}
              intelligibility={4.8}
              colorVar="var(--color-lang-yo)"
            />
          </div>
        </section>

        {/* Section 3: Timeline */}
        <section className="eval-block mb-32">
          <div className="eval-block-header">
            <h2>How we evaluate</h2>
          </div>
          
          <div className="glass-panel p-8">
            <div className="eval-timeline">
              <div className="timeline-step">
                <div className="step-number">1</div>
                <div className="step-content">
                  <h4 className="text-primary mb-1">Vision Extraction</h4>
                  <p className="text-sm text-secondary">Images are processed through SigLIP2 to generate English scene descriptions.</p>
                </div>
              </div>
              <div className="timeline-connector"></div>
              <div className="timeline-step">
                <div className="step-number">2</div>
                <div className="step-content">
                  <h4 className="text-primary mb-1">Native Transfer</h4>
                  <p className="text-sm text-secondary">N-ATLAS translates the grounded English descriptions into the target language.</p>
                </div>
              </div>
              <div className="timeline-connector"></div>
              <div className="timeline-step">
                <div className="step-number">3</div>
                <div className="step-content">
                  <h4 className="text-primary mb-1">Human Rating</h4>
                  <p className="text-sm text-secondary">Native speakers blind-rate the outputs for accuracy and fluency.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default Evaluation;
