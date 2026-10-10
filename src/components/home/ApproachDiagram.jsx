import React from 'react';
import { motion } from 'framer-motion';
import { Image as ImageIcon, Layers, Globe } from 'lucide-react';
import './ApproachDiagram.css';

const STAGES = [
  {
    id: 'vision',
    number: '01',
    icon: ImageIcon,
    title: 'Vision',
    sub: 'SigLIP 2 — frozen encoder',
    text: 'The image is encoded into dense visual features. No language is involved yet.',
  },
  {
    id: 'semantic',
    number: '02',
    icon: Layers,
    title: 'Semantic understanding',
    sub: 'Multimodal projection → N-ATLAS',
    text: 'A trained projection maps visual features into the N-ATLAS embedding space, where they can be reasoned about.',
  },
  {
    id: 'language',
    number: '03',
    icon: Globe,
    title: 'Native language',
    sub: 'Igbo · Yoruba · Hausa · English',
    text: 'N-ATLAS grounds what it sees and realizes the description in the requested language.',
  },
];

const PIPELINE = [
  'Image',
  'SigLIP 2',
  'MLP projection',
  'N-ATLAS 8B',
  'IG · HA · YO',
];

const LANGS = [
  { code: 'IG', name: 'Igbo', color: 'var(--color-lang-ig)' },
  { code: 'YO', name: 'Yoruba', color: 'var(--color-lang-yo)' },
  { code: 'HA', name: 'Hausa', color: 'var(--color-lang-ha)' },
];

/**
 * System-abstraction diagram: Vision → Semantic understanding → Native language,
 * with the concrete pipeline listed underneath.
 */
const ApproachDiagram = () => {
  return (
    <div className="approach-diagram">
      <div className="approach-stages">
        {STAGES.map((stage, index) => {
          const Icon = stage.icon;
          return (
            <React.Fragment key={stage.id}>
              <motion.div
                className="approach-stage glass-panel"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
              >
                <div className="stage-head">
                  <span className="stage-icon" aria-hidden="true">
                    <Icon size={18} strokeWidth={1.75} />
                  </span>
                  <span className="stage-number mono">{stage.number}</span>
                </div>
                <h3 className="stage-title">{stage.title}</h3>
                <span className="tech-label stage-sub">{stage.sub}</span>
                <p className="stage-text">{stage.text}</p>
                {stage.id === 'language' && (
                  <div className="stage-langs">
                    {LANGS.map((lang) => (
                      <span className="stage-lang" key={lang.code}>
                        <span className="lang-dot" style={{ backgroundColor: lang.color }}></span>
                        {lang.name}
                      </span>
                    ))}
                  </div>
                )}
              </motion.div>
              {index < STAGES.length - 1 && (
                <div className="stage-connector" aria-hidden="true">
                  <span className="connector-line"></span>
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      <div className="pipeline-bar mono" aria-label="Concrete pipeline">
        {PIPELINE.map((step, index) => (
          <React.Fragment key={step}>
            {index > 0 && <span className="pipeline-arrow" aria-hidden="true">→</span>}
            <span className="pipeline-step">{step}</span>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default ApproachDiagram;
