import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import './DeveloperStack.css';

const TABS = [
  { id: 'sdk', label: 'Python SDK' },
  { id: 'install', label: 'Install & Auth' },
  { id: 'api', label: 'REST API' },
];

const ANATOMY = [
  { layer: 'Model', value: 'Atlas Vision' },
  { layer: 'Foundation LLM', value: 'N-ATLaS 8B' },
  { layer: 'Vision Encoder', value: 'SigLIP 2' },
  { layer: 'Python SDK', value: 'testatlasvision (PyPI)' },
  { layer: 'Client Class', value: 'TestAtlasVision' },
  { layer: 'Quantization', value: '4-bit (bitsandbytes)' },
  { layer: 'Reproducibility', value: 'Colab smoke_test.ipynb' },
  { layer: 'Model Weights', value: 'huggingface.co/Modularcomputing/AtlasVision' },
];

const SdkCode = () => (
  <pre className="code-block mono">
    <code>
      <span className="code-kw">from</span> testatlasvision <span className="code-kw">import</span> TestAtlasVision, GenerationConfig{'\n\n'}
      <span className="code-comment"># Load once on GPU (requires HF_TOKEN with model access)</span>{'\n'}
      model = TestAtlasVision(){'\n\n'}
      <span className="code-comment"># Native-language visual chat (Igbo, Hausa, Yoruba, English)</span>{'\n'}
      r = model.chat(<span className="code-str">"market.jpg"</span>, <span className="code-str">"Kedu ihe dị na foto a?"</span>, lang=<span className="code-str">"ig"</span>){'\n'}
      <span className="code-fn">print</span>(r.answer){'\n'}
      <span className="code-comment"># -&gt; Ahịa mepere emepe ebe ndị na-ere ahịa...</span>{'\n\n'}
      <span className="code-comment"># Multilingual image captioning</span>{'\n'}
      caption = model.describe(<span className="code-str">"fashion.jpg"</span>, lang=<span className="code-str">"yo"</span>){'\n\n'}
      <span className="code-comment"># Follow-up conversation session</span>{'\n'}
      s = model.new_session(){'\n'}
      model.ask(<span className="code-str">"market.jpg"</span>, <span className="code-str">"What is the main object?"</span>, session=s)
    </code>
  </pre>
);

const InstallCode = () => (
  <pre className="code-block mono">
    <code>
      <span className="code-comment"># Core installation from PyPI</span>{'\n'}
      <span className="code-prompt">$</span> pip install testatlasvision{'\n\n'}
      <span className="code-comment"># 4-bit quantization for GPUs &lt; 20GB (e.g. Colab T4)</span>{'\n'}
      <span className="code-prompt">$</span> pip install <span className="code-str">"testatlasvision[4bit]"</span>{'\n\n'}
      <span className="code-comment"># Authentication: https://huggingface.co/Modularcomputing/AtlasVision</span>{'\n'}
      <span className="code-prompt">$</span> export HF_TOKEN=<span className="code-str">"hf_..."</span>{'\n\n'}
      <span className="code-comment"># Or set interactive login in Python:</span>{'\n'}
      <span className="code-kw">model</span> = TestAtlasVision(interactive_login=<span className="code-kw">True</span>)
    </code>
  </pre>
);

const ApiCode = () => (
  <pre className="code-block mono">
    <code>
      <span className="code-prompt">$</span> curl -X POST https://...modal.run/chat \{'\n'}
      {'    '}-H <span className="code-str">"Authorization: Bearer $ATLAS_API_KEY"</span> \{'\n'}
      {'    '}-F <span className="code-str">"image=@market.jpg"</span> \{'\n'}
      {'    '}-F <span className="code-str">"question=What objects are in this image?"</span> \{'\n'}
      {'    '}-F <span className="code-str">"lang=ig"</span>{'\n\n'}
      <span className="code-comment">← 200 OK</span>{'\n'}
      {'{'}{'\n'}
      {'  '}<span className="code-kw">"answer"</span>: <span className="code-str">"Ahịa mepere emepe..."</span>,{'\n'}
      {'  '}<span className="code-kw">"english_question"</span>: <span className="code-str">"What objects are in this image?"</span>,{'\n'}
      {'  '}<span className="code-kw">"english_answer"</span>: <span className="code-str">"An open air market with vendors..."</span>{'\n'}
      {'}'}
    </code>
  </pre>
);

/**
 * Tabbed SDK / API code panel plus the "what the submission contains" anatomy grid.
 */
const DeveloperStack = () => {
  const [activeTab, setActiveTab] = useState('sdk');

  const renderCode = () => {
    switch (activeTab) {
      case 'sdk':
        return <SdkCode />;
      case 'install':
        return <InstallCode />;
      case 'api':
        return <ApiCode />;
      default:
        return <SdkCode />;
    }
  };

  return (
    <div className="developer-stack">
      <div className="code-panel glass-panel">
        <div className="code-panel-header">
          <div className="code-dots" aria-hidden="true">
            <span></span><span></span><span></span>
          </div>
          <div className="code-tabs" role="tablist" aria-label="Interface examples">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                role="tab"
                aria-selected={activeTab === tab.id}
                className={`code-tab ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
        <div className="code-panel-body">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25 }}
            >
              {renderCode()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="anatomy-block">
        <span className="tech-label anatomy-heading">What the submission contains</span>
        <dl className="anatomy-grid">
          {ANATOMY.map((item) => (
            <div className="anatomy-row" key={item.layer}>
              <dt className="anatomy-layer mono">{item.layer}</dt>
              <dd className="anatomy-value">{item.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
};

export default DeveloperStack;
