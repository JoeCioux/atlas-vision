import React, { useState, useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';
import './CLISimulator.css';

const LANGUAGES = [
  { code: 'ig', name: 'Igbo', caption: 'Ahịa mepere emepe...' },
  { code: 'ha', name: 'Hausa', caption: 'Kasuwar buɗe wadda ke...' },
  { code: 'yo', name: 'Yoruba', caption: 'Ọjà gbangba tí ó kún...' }
];

const CLISimulator = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.5 });
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const [langIndex, setLangIndex] = useState(0);
  const [phase, setPhase] = useState(0);
  // 0: start/typing, 1: running, 2: output, 3: pause before next

  const [commandTyped, setCommandTyped] = useState("");

  const currentLang = LANGUAGES[langIndex];
  const targetCommand = `testatlasvision describe "market.jpg" --lang ${currentLang.code}`;

  useEffect(() => {
    if (!isInView) return;

    if (prefersReducedMotion) {
      setCommandTyped(targetCommand);
      setPhase(2);
      return;
    }

    let timeout;

    if (phase === 0) {
      if (commandTyped.length < targetCommand.length) {
        timeout = setTimeout(() => {
          setCommandTyped(targetCommand.slice(0, commandTyped.length + 1));
        }, 50); // Typing speed
      } else {
        timeout = setTimeout(() => setPhase(1), 500);
      }
    } else if (phase === 1) {
      timeout = setTimeout(() => setPhase(2), 1000); // Simulated processing
    } else if (phase === 2) {
      timeout = setTimeout(() => setPhase(3), 3000); // Hold on result
    } else if (phase === 3) {
      // Reset for next language
      setCommandTyped("");
      setLangIndex((prev) => (prev + 1) % LANGUAGES.length);
      setPhase(0);
    }

    return () => clearTimeout(timeout);
  }, [phase, commandTyped, targetCommand, isInView, prefersReducedMotion]);

  return (
    <div className="cli-simulator glass-panel" ref={containerRef}>
      <div className="cli-header">
        <div className="cli-dots">
          <span></span><span></span><span></span>
        </div>
        <span className="cli-title">bash</span>
      </div>

      <div className="cli-body mono">
        <div className="cli-line">
          <span className="cli-prompt">$</span>

          {phase === 0 ? (
            <span className="cli-text text-primary">{commandTyped}</span>
          ) : (
            <span className="cli-text syntax-highlighted">
              <span className="text-primary">atlas-vision</span> describe <span className="text-indigo">"market.jpg"</span> <span className="text-accent">--lang {currentLang.code}</span>
            </span>
          )}

          {phase === 0 && <span className="cli-cursor" />}
        </div>

        {phase >= 2 && (
          <div className="cli-output mt-4">
            <div className="json-block">
              {'{'}
              <div className="json-row">
                <span className="text-primary">"status":</span> <span className="text-indigo">"success"</span>,
              </div>
              <div className="json-row">
                <span className="text-primary">"language":</span> <span className="text-indigo">"{currentLang.name}"</span>,
              </div>
              <div className="json-row">
                <span className="text-primary">"caption":</span> <span className="text-indigo">"{currentLang.caption}"</span>
              </div>
              {'}'}
            </div>
            {phase === 2 && <span className="cli-cursor mt-2 inline-block" />}
          </div>
        )}
      </div>
    </div>
  );
};

export default CLISimulator;
