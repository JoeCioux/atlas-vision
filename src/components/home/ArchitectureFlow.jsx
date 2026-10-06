import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronRight, Zap, Image as ImageIcon, Box, Layers, Globe, AlignLeft } from 'lucide-react';
import './ArchitectureFlow.css';

const steps = [
  {
    id: 'image',
    number: '01',
    label: 'IMAGE INPUT',
    desc: 'Raw visual input provided by the user. The initial state of the pipeline.',
    status: 'INPUT',
    icon: ImageIcon,
    highlights: ['image']
  },
  {
    id: 'siglip',
    number: '02',
    label: 'SIGLIP2',
    desc: 'Extracts dense visual features from the input image without modification.',
    status: 'FROZEN',
    icon: Box,
    highlights: ['siglip']
  },
  {
    id: 'mlp',
    number: '03',
    label: 'MLP PROJECTOR',
    desc: 'Maps visual features from SigLIP2 into the embedding space understood by N-ATLAS.',
    status: 'TRAINED',
    icon: Zap,
    highlights: ['siglip', 'mlp', 'natlas'] // highlights flow
  },
  {
    id: 'natlas',
    number: '04',
    label: 'N-ATLAS 8B',
    desc: 'Frozen language backbone. Receives visual tokens in its embedding space for semantic reasoning.',
    status: 'FROZEN',
    icon: Layers,
    highlights: ['natlas']
  },
  {
    id: 'stage-a',
    number: '05',
    label: 'STAGE A (ENGLISH)',
    desc: 'Generates the intermediate semantic meaning in English as a robust foundational representation.',
    status: 'CASCADE',
    icon: AlignLeft,
    highlights: ['stage-a']
  },
  {
    id: 'stage-b',
    number: '06',
    label: 'STAGE B (TRANSFER)',
    desc: 'Translates the semantic concept from the English embedding space to the target language token space.',
    status: 'CASCADE',
    icon: Globe,
    highlights: ['stage-a', 'stage-b']
  },
  {
    id: 'target',
    number: '07',
    label: 'OUTPUT LANGUAGES',
    desc: 'Final generation in the designated target language (Igbo, Hausa, or Yoruba).',
    status: 'OUTPUT',
    icon: AlignLeft,
    highlights: ['stage-b', 'target']
  }
];

const ArchitectureFlow = () => {
  const [activeStep, setActiveStep] = useState(null); // idle by default

  const handleStepClick = (id) => {
    setActiveStep(activeStep === id ? null : id);
  };

  const getActiveHighlights = () => {
    if (!activeStep) return [];
    const step = steps.find(s => s.id === activeStep);
    return step ? step.highlights : [];
  };

  const activeHighlights = getActiveHighlights();

  const isHighlighted = (nodeId) => {
    if (!activeStep) return true; // if nothing active, everything is normal
    return activeHighlights.includes(nodeId);
  };

  return (
    <div className="iso-architecture-container">
      
      {/* LEFT: STEP NAVIGATOR */}
      <div className="step-navigator">
        <div className="nav-timeline-line"></div>
        
        {steps.map((step) => {
          const isActive = activeStep === step.id;
          const Icon = step.icon;
          
          return (
            <div key={step.id} className={`nav-step-item ${isActive ? 'active' : ''}`}>
              <div 
                className="step-header" 
                onClick={() => handleStepClick(step.id)}
              >
                <div className="step-marker">
                  <div className="marker-inner"></div>
                </div>
                <div className="step-title-group">
                  <span className="step-number font-mono">{step.number}</span>
                  <span className="step-label">{step.label}</span>
                </div>
                <div className="step-chevron">
                  <ChevronDown size={16} className={`chevron-icon ${isActive ? 'open' : ''}`} />
                </div>
              </div>
              
              <AnimatePresence>
                {isActive && (
                  <motion.div 
                    className="step-content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                  >
                    <div className="step-content-inner">
                      <p className="step-desc text-secondary">{step.desc}</p>
                      <div className="step-meta mt-3">
                        <span className={`status-badge ${step.status === 'TRAINED' ? 'active' : ''}`}>
                          {step.status === 'TRAINED' && <Zap size={12} className="mr-1 inline" />}
                          {step.status}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* RIGHT: ISOMETRIC DIAGRAM */}
      <div className={`iso-diagram-area ${!activeStep ? 'idle-mode' : ''}`}>
        <div className="iso-scene">
          
          {/* Background structural planes */}
          <div className="iso-plane layer-vision">
            <span className="plane-label">VISION LAYER</span>
          </div>
          <div className="iso-plane layer-language">
            <span className="plane-label">LANGUAGE LAYER</span>
          </div>

          {/* Node: Image */}
          <div className={`iso-node node-image ${activeStep ? (isHighlighted('image') ? 'highlight active-node' : 'dim') : ''}`}>
            <div className="iso-cube">
              <div className="cube-top">
                <ImageIcon size={24} className="cube-icon" />
              </div>
              <div className="cube-left"></div>
              <div className="cube-right"></div>
            </div>
            <div className="node-label">IMAGE INPUT</div>
          </div>

          {/* Connector: Image -> SigLIP */}
          <div className={`iso-path path-img-siglip ${activeStep && isHighlighted('siglip') && isHighlighted('image') ? 'active-path' : ''}`}></div>

          {/* Node: SigLIP */}
          <div className={`iso-node node-siglip ${activeStep ? (isHighlighted('siglip') ? 'highlight active-node' : 'dim') : ''}`}>
            <div className="iso-cube">
              <div className="cube-top">
                <span className="cube-text">SIGLIP2</span>
              </div>
              <div className="cube-left"></div>
              <div className="cube-right"></div>
            </div>
            <div className="node-label">FROZEN ENCODER</div>
          </div>

          {/* Connector: SigLIP -> MLP */}
          <div className={`iso-path path-siglip-mlp ${activeStep && isHighlighted('siglip') && isHighlighted('mlp') ? 'active-path' : ''}`}></div>

          {/* Node: MLP Projector */}
          <div className={`iso-node node-mlp ${activeStep ? (isHighlighted('mlp') ? 'highlight active-node' : 'dim') : ''}`}>
            <div className="iso-cube">
              <div className="cube-top">
                <Zap size={20} className="cube-icon" />
              </div>
              <div className="cube-left"></div>
              <div className="cube-right"></div>
            </div>
            <div className="node-label">MLP PROJECTOR</div>
          </div>

          {/* Connector: MLP -> N-ATLAS */}
          <div className={`iso-path path-mlp-natlas ${activeStep && isHighlighted('mlp') && isHighlighted('natlas') ? 'active-path' : ''}`}></div>

          {/* Node: N-ATLAS */}
          <div className={`iso-node node-natlas ${activeStep ? (isHighlighted('natlas') ? 'highlight active-node' : 'dim') : ''}`}>
            <div className="iso-cube large-cube">
              <div className="cube-top">
                <span className="cube-text">N-ATLAS 8B</span>
              </div>
              <div className="cube-left"></div>
              <div className="cube-right"></div>
            </div>
            <div className="node-label">LANGUAGE BACKBONE</div>
          </div>

          {/* Connector: N-ATLAS -> Stage A */}
          <div className={`iso-path path-natlas-stagea ${activeStep && isHighlighted('stage-a') && isHighlighted('natlas') ? 'active-path' : ''}`}></div>

          {/* Node: Stage A */}
          <div className={`iso-node node-stagea ${activeStep ? (isHighlighted('stage-a') ? 'highlight active-node' : 'dim') : ''}`}>
            <div className="iso-cube flat-cube">
              <div className="cube-top">
                <span className="cube-text">STAGE A</span>
              </div>
              <div className="cube-left"></div>
              <div className="cube-right"></div>
            </div>
            <div className="node-label">ENGLISH DESC.</div>
          </div>

          {/* Connector: Stage A -> Stage B */}
          <div className={`iso-path path-stagea-stageb ${activeStep && isHighlighted('stage-a') && isHighlighted('stage-b') ? 'active-path' : ''}`}></div>

          {/* Node: Stage B */}
          <div className={`iso-node node-stageb ${activeStep ? (isHighlighted('stage-b') ? 'highlight active-node' : 'dim') : ''}`}>
            <div className="iso-cube flat-cube transfer-cube">
              <div className="cube-top">
                <Globe size={18} className="cube-icon" />
              </div>
              <div className="cube-left"></div>
              <div className="cube-right"></div>
            </div>
            <div className="node-label">LANGUAGE TRANSFER</div>
          </div>

          {/* Connector: Stage B -> Output */}
          <div className={`iso-path path-stageb-target ${activeStep && isHighlighted('stage-b') && isHighlighted('target') ? 'active-path' : ''}`}></div>

          {/* Node: Target Output */}
          <div className={`iso-node node-target ${activeStep ? (isHighlighted('target') ? 'highlight active-node' : 'dim') : ''}`}>
            <div className="iso-cube output-cube">
              <div className="cube-top">
                <span className="cube-text">OUTPUT</span>
              </div>
              <div className="cube-left"></div>
              <div className="cube-right"></div>
            </div>
            <div className="node-label">IG / HA / YO</div>
          </div>

        </div>
      </div>
      
    </div>
  );
};

export default ArchitectureFlow;
