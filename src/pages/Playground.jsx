import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, ArrowUp, X, Copy, RefreshCw, Languages, Zap, MessageSquare, Sparkles } from 'lucide-react';
import './Playground.css';

import { askAboutImage, askText, toImageFile } from '../lib/atlasApi';

import imgMarket from '../assets/market_scene.png';
import imgTextile from '../assets/textile_fashion.png';
import imgTransport from '../assets/everyday_transport.png';

const LANGUAGES = {
  yo: { name: 'Yoruba', color: 'var(--color-lang-yo)', bg: 'rgba(235, 122, 52, 0.1)' },
  ig: { name: 'Igbo', color: 'var(--color-lang-ig)', bg: 'rgba(52, 168, 83, 0.1)' },
  ha: { name: 'Hausa', color: 'var(--color-lang-ha)', bg: 'rgba(66, 133, 244, 0.1)' }
};

const SUGGESTIONS = [
  "Describe this image in detail",
  "What objects are here?",
  "What is happening in this scene?"
];

const SAMPLES = [
  { src: imgMarket, alt: 'Market' },
  { src: imgTextile, alt: 'Textile' },
  { src: imgTransport, alt: 'Transport' }
];

const Playground = () => {
  const [image, setImage] = useState(null);
  const [targetLang, setTargetLang] = useState('yo');
  const [prompt, setPrompt] = useState('');
  const [conversation, setConversation] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processStep, setProcessStep] = useState(0); 
  const [showEnglishFor, setShowEnglishFor] = useState(null); 
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [coldHint, setColdHint] = useState(false);

  const fileInputRef = useRef(null);
  const textareaRef = useRef(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [prompt]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversation, processStep]);

  const handleMouseMove = (e) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleImageSet(e.dataTransfer.files[0]);
    }
  };

  const handlePaste = (e) => {
    if (e.clipboardData.files && e.clipboardData.files[0]) {
      handleImageSet(e.clipboardData.files[0]);
    }
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleImageSet(e.target.files[0]);
    }
    e.target.value = '';
  };

  const handleImageSet = (file) => {
    if (typeof file === 'string') {
      setImage(file);
      return;
    }
    if (!file.type.match('image.*')) {
      alert("Unsupported file type. Please upload JPEG, PNG, or WEBP.");
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => setImage(e.target.result);
    reader.readAsDataURL(file);
  };

  const coldHintTimer = useRef(null);

  // Fire a real request at the AtlasVision API through the same-origin proxy.
  // req: { imageSrc, question, lang } for vision calls, { prompt } for text-only.
  const runRequest = async (req) => {
    setIsProcessing(true);
    setProcessStep(1);
    setColdHint(false);
    clearTimeout(coldHintTimer.current);
    coldHintTimer.current = setTimeout(() => setColdHint(true), 15000);

    const id = Date.now();

    try {
      let content;
      let english = null;
      let lang = req.lang || 'en';

      if (req.imageSrc) {
        setProcessStep(2);
        const file = await toImageFile(req.imageSrc);
        setProcessStep(3);
        const result = await askAboutImage(file, req.question, lang);
        content = result.answer || result.caption || '';
        english = result.english_answer || null;
      } else {
        setProcessStep(3);
        const result = await askText(req.prompt);
        content = result.answer || '';
        lang = 'text';
      }

      setConversation(prev => [
        ...prev,
        { id, role: 'atlas', lang, content, english, request: req }
      ]);
    } catch (err) {
      setConversation(prev => [
        ...prev,
        { id, role: 'error', content: err.message || 'The request failed. Try again.' }
      ]);
    } finally {
      clearTimeout(coldHintTimer.current);
      setColdHint(false);
      setIsProcessing(false);
      setProcessStep(0);
    }
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    if ((!image && !prompt.trim()) || isProcessing) return;

    const question = prompt.trim();
    const request = { imageSrc: image, question, lang: targetLang, prompt: question };

    setConversation(prev => [
      ...prev,
      {
        id: Date.now(),
        role: 'user',
        content: question,
        image: image
      }
    ]);

    setPrompt('');
    setImage(null);
    runRequest(request);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const canSubmit = (image || prompt.trim()) && !isProcessing;

  return (
    <div 
      className="playground-page" 
      onDragOver={handleDragOver} 
      onDragLeave={handleDragLeave} 
      onDrop={handleDrop}
      onPaste={handlePaste}
      onMouseMove={handleMouseMove}
      style={{
        '--mouse-x': `${mousePos.x}px`,
        '--mouse-y': `${mousePos.y}px`
      }}
    >
      <input type="file" ref={fileInputRef} onChange={handleImageChange} accept="image/jpeg,image/png,image/webp" hidden />
      
      <AnimatePresence>
        {isDragging && (
          <motion.div 
            className="drag-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="drag-content">
              <Plus size={48} className="text-accent mb-4" />
              <h2>Drop image to upload</h2>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="chat-viewport">
        {conversation.length === 0 ? (
          <div className="empty-state-workspace">
            <div className="playground-glow-bg"></div>
            <div className="faded-pattern-bg"></div>
            
            <h1 className="empty-heading">
              What do you want Atlas to <span className="highlight-word">see</span>?
            </h1>
            
            <div className="suggestion-chips">
              {SUGGESTIONS.map((sug, i) => (
                <button key={i} className="suggestion-chip glass-panel" onClick={() => setPrompt(sug)}>
                  <MessageSquare size={14} className="chip-icon" />
                  <span>{sug}</span>
                </button>
              ))}
            </div>
            
            <div className="sample-images mt-8">
              <p className="text-secondary text-sm mb-3">Or try with a sample:</p>
              <div className="sample-grid">
                {SAMPLES.map((s, i) => (
                  <button key={i} className="sample-btn" onClick={() => handleImageSet(s.src)}>
                    <img src={s.src} alt={s.alt} />
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="messages-container">
            {conversation.map((msg) => {
              const langMeta = LANGUAGES[msg.lang] || { name: 'Text', color: 'var(--color-lang-en)', bg: 'rgba(138, 148, 166, 0.1)' };
              return (
              <div key={msg.id} className={`message-row ${msg.role}`}>
                
                {msg.role === 'user' ? (
                  <div className="message-bubble user-bubble">
                    {msg.image && <img src={msg.image} alt="User upload" className="msg-img-attachment" />}
                    {msg.content && <p className="msg-text">{msg.content}</p>}
                  </div>
                ) : msg.role === 'atlas' ? (
                  <div className="message-bubble atlas-bubble">
                    <div className="atlas-avatar">
                      <Zap size={16} color="white" />
                    </div>
                    <div className="atlas-response-content">
                      <div className="lang-indicator">
                        <span className="lang-badge" style={{ backgroundColor: langMeta.bg, color: langMeta.color, borderColor: langMeta.color }}>
                          {msg.lang.toUpperCase()}
                        </span>
                        {langMeta.name}
                      </div>
                      
                      <div className="typing-effect">
                        <p className="msg-text main-text">{msg.content}</p>
                      </div>

                      <AnimatePresence>
                        {showEnglishFor === msg.id && msg.lang !== 'en' && (
                          <motion.div 
                            className="english-translation-box"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                          >
                            <span className="tech-label text-secondary block mb-1">ENGLISH</span>
                            <p className="text-secondary italic">{msg.english}</p>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <div className="msg-actions">
                        <button className="action-icon-btn" title="Copy" onClick={() => navigator.clipboard.writeText(msg.content)}>
                          <Copy size={14} />
                        </button>
                        <button
                          className="action-icon-btn"
                          title="Regenerate"
                          disabled={isProcessing || !msg.request}
                          onClick={() => msg.request && runRequest(msg.request)}
                        >
                          <RefreshCw size={14} />
                        </button>
                        {msg.lang !== 'en' && (
                          <button 
                            className={`action-btn-text ${showEnglishFor === msg.id ? 'active' : ''}`}
                            onClick={() => setShowEnglishFor(showEnglishFor === msg.id ? null : msg.id)}
                          >
                            <Languages size={14} className="mr-1 inline" />
                            {showEnglishFor === msg.id ? 'Hide English' : 'Show English'}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="message-bubble atlas-bubble error-bubble">
                    <div className="atlas-avatar error-avatar">
                      <Zap size={16} color="white" />
                    </div>
                    <div className="atlas-response-content">
                      <span className="tech-label error-label">REQUEST FAILED</span>
                      <p className="msg-text">{msg.content}</p>
                    </div>
                  </div>
                )}
              </div>
              );
            })}
            
            {isProcessing && (
              <div className="message-row atlas">
                <div className="message-bubble atlas-bubble">
                  <div className="atlas-avatar pulsing">
                    <Sparkles size={16} color="white" />
                  </div>
                  <div className="processing-pipeline">
                    <div className={`pipeline-step ${processStep >= 1 ? 'active' : ''}`}>
                      <span className="step-dot"></span> Vision Extraction
                    </div>
                    <div className={`pipeline-step ${processStep >= 2 ? 'active' : ''}`}>
                      <span className="step-dot"></span> English Grounding
                    </div>
                    <div className={`pipeline-step ${processStep >= 3 ? 'active' : ''}`}>
                      <span className="step-dot"></span> Native Language Transfer
                    </div>
                    <AnimatePresence>
                      {coldHint && (
                        <motion.p
                          className="cold-start-hint"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        >
                          The service scales to zero when idle — this first call is starting the GPU and can take up to 10 minutes. Later calls are fast.
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      <div className="composer-container">
        <div className="composer-lang-selector mb-3 flex gap-2">
          {Object.entries(LANGUAGES).map(([key, data]) => (
            <button
              key={key}
              className={`lang-pill ${targetLang === key ? 'active' : ''}`}
              onClick={() => setTargetLang(key)}
            >
              <span className="lang-badge" style={{ backgroundColor: targetLang === key ? data.color : data.bg, color: targetLang === key ? '#fff' : data.color, borderColor: targetLang === key ? data.color : 'var(--color-border-hairline)' }}>
                {key.toUpperCase()}
              </span>
              {data.name}
            </button>
          ))}
        </div>
        
        <div className="composer-inner">
          {image && (
            <div className="composer-attachments">
              <div className="attachment-chip">
                <img src={image} alt="Preview" />
                <button className="remove-btn" onClick={() => setImage(null)}><X size={12} /></button>
              </div>
            </div>
          )}

          <div className="composer-bar">
            <button className="composer-add-btn" onClick={() => fileInputRef.current?.click()} aria-label="Add image">
              <Plus size={20} />
            </button>
            
            <textarea
              ref={textareaRef}
              className="composer-input"
              placeholder="Ask Atlas to describe an image..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={handleKeyDown}
              rows={1}
            />

            <div className="composer-actions">
              <button 
                className={`composer-send-btn ${canSubmit ? 'ready pulse-btn' : 'disabled'}`}
                onClick={handleSubmit}
                disabled={!canSubmit}
                aria-label="Send message"
              >
                <ArrowUp size={20} />
              </button>
            </div>
          </div>
        </div>
        <div className="composer-footer mt-2">
          <p>Atlas Vision can make mistakes. Verify important translations. The first call after idle can take a few minutes.</p>
        </div>
      </div>
    </div>
  );
};

export default Playground;
