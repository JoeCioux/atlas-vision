import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Code } from 'lucide-react';
import './Overview.css';

// Components
import SectionIntro from '../components/home/SectionIntro';
import StackStrip from '../components/home/StackStrip';
import ApproachDiagram from '../components/home/ApproachDiagram';
import AtlasCore from '../components/home/AtlasCore';
import DeveloperStack from '../components/home/DeveloperStack';
import EvaluationMatrix from '../components/home/EvaluationMatrix';
import RoadmapTrack from '../components/home/RoadmapTrack';
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

const PLATFORM_LINKS = [
  {
    name: 'Playground',
    description: 'Experiment with visual understanding directly in the browser.',
    to: '/playground',
    internal: true,
  },
  {
    name: 'Google Colab',
    description: 'Reproduce the model or run your own experiments with our notebooks.',
    to: 'https://colab.research.google.com/drive/1NK-6oyUtzAxENgmUsD_UjO5wZAMogPt5',
    internal: false,
  },
  {
    name: 'Hugging Face',
    description: 'Open model weights and configuration for researchers and developers.',
    to: 'https://huggingface.co/Modularcomputing/AtlasVision',
    internal: false,
  },
  {
    name: 'GitHub',
    description: 'SDK source, examples and documentation.',
    to: 'https://github.com/justphemi/testatlassdk',
    internal: false,
  },
];

const DOMAINS = [
  'African-language education',
  'Accessibility systems',
  'Agricultural vision',
  'Localized visual search',
  'Cultural heritage',
  'Healthcare interfaces',
  'Multilingual agents',
  'Computer vision',
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

      {/* ============ HERO ============ */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="tech-label hero-eyebrow">An open multimodal stack — N-ATLAS × SigLIP 2</span>
              <h1 className="hero-title">
                MULTIMODAL AI FOR <span className="text-accent">NATIVE AFRICAN LANGUAGES.</span>
              </h1>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="hero-subtitle text-secondary mt-4"
            >
              Extending N-ATLAS with visual intelligence, through an open developer stack.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="hero-description mt-6"
            >
              Atlas Vision lets applications perceive images and answer in Igbo, Hausa and Yoruba — shipped as a model, an SDK, an API, a playground and open weights.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="hero-actions mt-8"
            >
              <Link to="/playground" className="btn-primary">
                Try the Playground <ArrowRight size={16} />
              </Link>
              <Link to="/architecture" className="btn-secondary">
                Read the Research
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
                <img src={imgMarket} alt="A busy open-air market scene" className="demo-image" />
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
                    <span className="tech-label text-secondary block mb-2">{currentDemo.lang} · CAPTION</span>
                    <p className="demo-typing-text">{currentDemo.text}</p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ STACK LADDER ============ */}
      <StackStrip />

      {/* ============ 01 · THE CHALLENGE ============ */}
      <section className="home-section">
        <div className="container">
          <SectionIntro
            number="01"
            label="The Challenge"
            title={<>Multimodal AI can see.<br />But who does it speak for?</>}
            deck="Modern vision-language models perceive and reason about images — but their strongest capabilities remain concentrated in languages with abundant multimodal training data. For the hundreds of millions who speak African languages, the interface layer barely exists."
          />

          <div className="problem-flow">
            <div className="flow-step">
              <span className="tech-label">WHERE CAPABILITY CONCENTRATES</span>
              <p>Perception, grounding and reasoning stay strongest in high-resource languages.</p>
            </div>
            <div className="flow-arrow">→</div>
            <div className="flow-step">
              <span className="tech-label">THE DATA CONSTRAINT</span>
              <p>Direct image–Igbo, image–Yoruba and image–Hausa datasets are scarce.</p>
            </div>
            <div className="flow-arrow">→</div>
            <div className="flow-step highlight-step">
              <span className="tech-label text-accent">THE GAP</span>
              <p>N-ATLAS understands Nigerian languages — but until now, it couldn't see.</p>
            </div>
          </div>

          <blockquote className="key-question glass-panel">
            <span className="tech-label key-question-label">The research question, in one line</span>
            <p className="key-question-text">How do you extend visual intelligence to African languages when native image–language datasets don't exist?</p>
          </blockquote>
        </div>
      </section>

      {/* Cinematic Transition */}
      <section className="cinematic-section bg-pattern">
        <div className="container cinematic-container">
          <GapVisualization />
        </div>
      </section>

      {/* ============ 02 · OUR APPROACH ============ */}
      <section className="home-section">
        <div className="container">
          <SectionIntro
            number="02"
            label="Our Approach"
            title="Extending N-ATLAS into the visual domain."
            deck="Atlas Vision is a cascaded vision-language system: a frozen vision encoder, one trained projection, and the N-ATLAS language backbone. The stages are separated on purpose — perception and language generation can be improved independently."
          />

          <ApproachDiagram />

          <div className="approach-split">
            <div className="approach-copy">
              <h3 className="approach-subhead">Why a cascade, and why it matters here.</h3>
              <ul className="approach-points">
                <li>
                  <span className="tech-label">SEPARABLE CONCERNS</span>
                  <p>Visual perception and linguistic realization are handled by different components, so neither has to be retrained to improve the other.</p>
                </li>
                <li>
                  <span className="tech-label">LOW-RESOURCE REALISM</span>
                  <p>The design assumes scarce native image–language data instead of waiting for datasets that don't exist yet.</p>
                </li>
                <li>
                  <span className="tech-label">OPEN BY DEFAULT</span>
                  <p>Weights, SDK, notebooks and API are published, so the result can be inspected, reproduced and built on.</p>
                </li>
              </ul>
              <Link to="/architecture" className="btn-secondary approach-cta">
                Explore the architecture <ArrowRight size={16} />
              </Link>
            </div>
            <div className="approach-core-visual">
              <AtlasCore />
            </div>
          </div>
        </div>
      </section>

      {/* ============ 03 · THE RESEARCH ============ */}
      <section className="home-section bg-secondary">
        <div className="container">
          <SectionIntro
            number="03"
            label="The Research"
            title="Can visual understanding survive the transfer?"
            deck="The contribution is not a single model — it is evidence that visual perception can be carried into languages it was never trained against."
          />

          <blockquote className="research-question">
            <p>Can visual understanding be transferred into underrepresented African languages without large-scale native-language image-caption datasets?</p>
          </blockquote>

          <div className="research-grid">
            <div className="research-card">
              <span className="tech-label research-card-label">HYPOTHESIS</span>
              <p>Visual perception and linguistic realization can be separated — so an existing multilingual vision encoder can be connected to African-language models without retraining either one.</p>
            </div>
            <div className="research-card">
              <span className="tech-label research-card-label">METHOD</span>
              <p>SigLIP 2 encodes the image; a trained projection maps visual features into N-ATLAS's embedding space; N-ATLAS grounds the scene, then generates the requested language.</p>
            </div>
          </div>

          <div className="honesty-note">
            <span className="tech-label honesty-label">LIMITATION, STATED PLAINLY</span>
            <h3 className="honesty-title">Why English sits in the middle.</h3>
            <p>Because large-scale image–Igbo, image–Yoruba and image–Hausa datasets are scarce, Atlas Vision currently uses an intermediate semantic representation to bridge visual understanding and African-language generation. Naming that bottleneck honestly is the first step toward removing it — the plan is below, in <a href="#roadmap" className="inline-link">Open Research</a>.</p>
          </div>
        </div>
      </section>

      {/* ============ 04 · THE DEVELOPER PLATFORM ============ */}
      <section className="home-section">
        <div className="container">
          <SectionIntro
            number="04"
            label="The Developer Platform"
            title="From research model to developer infrastructure."
            deck="Atlas Vision is not just a model — it is a toolchain. Everything needed to call it, embed it, reproduce it or extend it ships alongside the weights."
          />

          <div className="dev-grid">
            <div className="dev-copy">
              <p className="dev-lead">A lightweight Python interface integrates Atlas Vision into applications and research workflows; a hosted REST API runs the same pipeline without model infrastructure to manage.</p>
              <div className="platform-rows">
                {PLATFORM_LINKS.map((platform) => {
                  const inner = (
                    <>
                      <div className="platform-row-text">
                        <span className="platform-name">{platform.name}</span>
                        <span className="platform-desc">{platform.description}</span>
                      </div>
                      <span className="platform-arrow" aria-hidden="true">
                        {platform.internal ? <ArrowRight size={16} /> : <ArrowUpRight size={16} />}
                      </span>
                    </>
                  );
                  return platform.internal ? (
                    <Link to={platform.to} className="platform-row" key={platform.name}>
                      {inner}
                    </Link>
                  ) : (
                    <a href={platform.to} className="platform-row" key={platform.name}>
                      {inner}
                    </a>
                  );
                })}
              </div>
            </div>

            <DeveloperStack />
          </div>
        </div>
      </section>

      {/* CLI — every interface over one pipeline */}
      <section className="technical-preview-section bg-secondary">
        <div className="container">
          <div className="split-layout">
            <div className="split-content flex-col justify-center">
              <h3 className="mb-4 text-3xl">ONE PIPELINE. EVERY INTERFACE.</h3>
              <p className="text-secondary mb-8">The same inference path is reachable from the terminal, the SDK and the API — so a prototype in the playground and a service in production are never running different models.</p>
              <Link to="/architecture" className="btn-secondary self-start">View Architecture</Link>
            </div>
            <div className="split-visual">
              <CLISimulator />
            </div>
          </div>
        </div>
      </section>

      {/* ============ 05 · NATIVE-LANGUAGE EVALUATION ============ */}
      <section className="home-section">
        <div className="container">
          <SectionIntro
            number="05"
            label="Native African Evaluation"
            title="Measuring native-language visual intelligence."
            deck="Supporting a language is a claim; measuring it is a result. Atlas Vision is evaluated per language along three axes — how well the image is understood, how well the language is generated, and whether the meaning survives the transfer."
          />

          <EvaluationMatrix />

          <div className="gallery-block">
            <div className="gallery-block-head">
              <h3 className="gallery-title">One image. Three languages.</h3>
              <p className="gallery-subtitle">Sample native-language outputs. The full benchmark lives on the Evaluation page.</p>
              <Link to="/evaluation" className="btn-secondary gallery-cta">
                Full evaluation & benchmarks <ArrowRight size={16} />
              </Link>
            </div>
            <div className="gallery-grid">
              <div className="gallery-card">
                <div className="gallery-image-wrapper">
                  <img src={imgMarket} alt="A busy open-air market scene" className="gallery-img" />
                  <div className="gallery-img-overlay">
                    <span className="tech-label text-white">MARKET SCENE</span>
                  </div>
                </div>
                <div className="gallery-caption text-secondary mt-3">
                  <span className="lang-badge" style={{ backgroundColor: 'rgba(242, 184, 75, 0.1)', color: 'var(--color-lang-ig)', borderColor: 'var(--color-lang-ig)' }}>IG</span>
                  <span>Ahịa mepere emepe ebe ndị na-ere ahịa na-ere mkpụrụ osisi...</span>
                </div>
              </div>
              <div className="gallery-card">
                <div className="gallery-image-wrapper">
                  <img src={imgTextile} alt="Handmade patterned textile and fashion" className="gallery-img" />
                  <div className="gallery-img-overlay">
                    <span className="tech-label text-white">TEXTILE / FASHION</span>
                  </div>
                </div>
                <div className="gallery-caption text-secondary mt-3">
                  <span className="lang-badge" style={{ backgroundColor: 'rgba(91, 91, 214, 0.1)', color: 'var(--color-lang-yo)', borderColor: 'var(--color-lang-yo)' }}>YO</span>
                  <span>Aṣọ aláràbarà tí a hun pẹ̀lú ọgbọ́n iṣẹ́ ọnà ìbílẹ̀...</span>
                </div>
              </div>
              <div className="gallery-card">
                <div className="gallery-image-wrapper active-card">
                  <img src={imgTransport} alt="Everyday street transport in Nigeria" className="gallery-img" />
                  <div className="gallery-img-overlay">
                    <span className="tech-label text-white">EVERYDAY TRANSPORT</span>
                  </div>
                </div>
                <div className="gallery-caption text-secondary mt-3">
                  <span className="lang-badge" style={{ backgroundColor: 'rgba(0, 135, 81, 0.1)', color: 'var(--color-lang-ha)', borderColor: 'var(--color-lang-ha)' }}>HA</span>
                  <span>Babura da ke ɗaukar fasinjoji a kan titi mai cike da mutane...</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ 06 · OPEN RESEARCH ============ */}
      <section className="home-section bg-secondary" id="roadmap">
        <div className="container">
          <SectionIntro
            number="06"
            label="Open Research"
            title="What comes next."
            deck="Atlas Vision is presented as a working system with a known frontier — not a finished problem. The intermediate representation is a deliberate stage on the way, not the destination."
          />

          <RoadmapTrack />

          <p className="roadmap-closing">
            The next generation of Atlas Vision will investigate direct multimodal learning using native African-language datasets — reducing dependence on intermediate representations and improving cultural and linguistic fidelity.
          </p>
        </div>
      </section>

      {/* ============ 07 · WHY IT MATTERS ============ */}
      <section className="home-section">
        <div className="container">
          <SectionIntro
            number="07"
            label="Why It Matters"
            title="Infrastructure, not applications."
            deck="African developers shouldn't have to build on AI systems whose strongest interfaces exist only in globally dominant languages."
          />

          <div className="impact-statement glass-panel">
            <p>Atlas Vision provides the <strong>infrastructure layer</strong>. Developers decide what to build on top of it.</p>
          </div>

          <div className="domain-chips">
            <span className="tech-label domain-chips-label">BUILT FOR</span>
            <div className="domain-chip-list">
              {DOMAINS.map((domain) => (
                <span className="domain-chip" key={domain}>{domain}</span>
              ))}
            </div>
            <p className="domain-caveat">Domains where native-language interfaces matter most. We ship the layer underneath — not finished products in each field.</p>
          </div>
        </div>
      </section>

      {/* ============ FINAL CTA ============ */}
      <section className="final-cta-section bg-pattern">
        <div className="container">
          <div className="final-cta-content glass-panel p-12 text-center">
            <h2 className="mb-4">BUILD WITH ATLAS VISION.</h2>
            <p className="text-secondary text-lg mb-8">Open weights, a Python SDK, a hosted API and a playground — start wherever your project lives.</p>
            <div className="cta-links">
              <Link to="/playground" className="btn-primary">
                Open Playground <ArrowRight size={16} />
              </Link>
              <a href="https://github.com/justphemi/testatlassdk" target="_blank" rel="noopener noreferrer" className="btn-secondary">
                <Code size={16} /> GitHub
              </a>
              <a href="https://huggingface.co/Modularcomputing/AtlasVision" target="_blank" rel="noopener noreferrer" className="btn-secondary">
                Hugging Face
              </a>
              <Link to="/architecture" className="btn-secondary">
                Read the Research
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Overview;
