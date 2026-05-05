import React, { useState } from 'react';
import './Calculator.css';

interface CalculatorProps {
  onClose: () => void;
}

export default function Calculator({ onClose }: CalculatorProps) {
  const [display, setDisplay] = useState('');

  const append = (value: string) => {
    setDisplay((prev) => prev + value);
  };

  const clearDisplay = () => {
    setDisplay('');
  };

  const deleteLast = () => {
    setDisplay((prev) => prev.slice(0, -1));
  };

  const calculate = () => {
    try {
      if (!display) return;
      // eslint-disable-next-line no-eval
      setDisplay(String(eval(display)));
    } catch {
      setDisplay('Error');
    }
  };

  const squareRoot = () => {
    try {
      if (!display) return;
      // eslint-disable-next-line no-eval
      setDisplay(String(Math.sqrt(eval(display))));
    } catch {
      setDisplay('Error');
    }
  };

  return (
    <div className="calculator-modal-overlay" onClick={onClose}>
      <div className="casio-calculator" onClick={(e) => e.stopPropagation()}>
        <button className="casio-close-btn" onClick={onClose}>✕</button>
        <div className="casio-top">
          <div className="casio-brand">CASIO</div>
          <div className="casio-solar"></div>
        </div>

        <input type="text" className="casio-display" value={display} readOnly />

        <div className="casio-buttons">
          <button className="casio-btn" onClick={clearDisplay}>AC</button>
          <button className="casio-btn" onClick={deleteLast}>C</button>
          <button className="casio-btn" onClick={() => append('%')}>%</button>
          <button className="casio-btn" onClick={() => append('/')}>÷</button>
          <button className="casio-btn" onClick={squareRoot}>√</button>

          <button className="casio-btn" onClick={() => append('7')}>7</button>
          <button className="casio-btn" onClick={() => append('8')}>8</button>
          <button className="casio-btn" onClick={() => append('9')}>9</button>
          <button className="casio-btn" onClick={() => append('*')}>×</button>
          <button className="casio-btn casio-operator" onClick={() => append('-')}>−</button>

          <button className="casio-btn" onClick={() => append('4')}>4</button>
          <button className="casio-btn" onClick={() => append('5')}>5</button>
          <button className="casio-btn" onClick={() => append('6')}>6</button>
          <button className="casio-btn casio-operator casio-plus" onClick={() => append('+')}>+</button>
          <button className="casio-btn" onClick={() => append('.')}>.</button>

          <button className="casio-btn" onClick={() => append('1')}>1</button>
          <button className="casio-btn" onClick={() => append('2')}>2</button>
          <button className="casio-btn" onClick={() => append('3')}>3</button>
          <button className="casio-btn casio-equal" onClick={calculate}>=</button>

          <button className="casio-btn casio-zero" onClick={() => append('0')}>0</button>
        </div>
      </div>
    </div>
  );
}
