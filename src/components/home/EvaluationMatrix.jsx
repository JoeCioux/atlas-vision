import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import './EvaluationMatrix.css';

const COLUMNS = ['Visual understanding', 'Language generation', 'Semantic fidelity'];

const ROWS = [
  { lang: 'English', code: 'EN', color: 'var(--color-lang-en)', cells: [true, true, null] },
  { lang: 'Igbo', code: 'IG', color: 'var(--color-lang-ig)', cells: [true, true, true] },
  { lang: 'Yoruba', code: 'YO', color: 'var(--color-lang-yo)', cells: [true, true, true] },
  { lang: 'Hausa', code: 'HA', color: 'var(--color-lang-ha)', cells: [true, true, true] },
];

const METRICS = [
  {
    title: 'Native language fidelity',
    text: 'Does the generated African-language response preserve the semantic content of the visual interpretation?',
  },
  {
    title: 'Visual grounding',
    text: 'Does the generated description correctly reflect the objects, relationships and attributes present in the image?',
  },
  {
    title: 'Cross-lingual consistency',
    text: 'Does changing the output language preserve the underlying visual meaning?',
  },
];

/**
 * Language × capability evaluation matrix with the three measured axes explained.
 */
const EvaluationMatrix = () => {
  return (
    <div className="eval-matrix-wrap">
      <motion.div
        className="eval-matrix-panel glass-panel"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
      >
        <table className="eval-matrix">
          <thead>
            <tr>
              <th scope="col">Language</th>
              {COLUMNS.map((col) => (
                <th scope="col" key={col}>{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ROWS.map((row) => (
              <tr key={row.lang}>
                <th scope="row">
                  <span className="matrix-lang">
                    <span className="lang-dot" style={{ backgroundColor: row.color }}></span>
                    {row.lang}
                  </span>
                </th>
                {row.cells.map((cell, index) => (
                  <td key={COLUMNS[index]} data-label={COLUMNS[index]}>
                    {cell ? (
                      <span className="matrix-check" aria-label="Supported">
                        <Check size={15} strokeWidth={2.5} />
                      </span>
                    ) : (
                      <span className="matrix-dash" aria-label="Reference output, not measured">—</span>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>

      <p className="eval-matrix-note">
        Semantic fidelity is measured only on translated outputs. English is the intermediate
        representation the pipeline grounds in, so it serves as the reference — not a target.
      </p>

      <div className="eval-metrics-grid">
        {METRICS.map((metric) => (
          <div className="eval-metric-card" key={metric.title}>
            <h3 className="eval-metric-title">{metric.title}</h3>
            <p className="eval-metric-text">{metric.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EvaluationMatrix;
