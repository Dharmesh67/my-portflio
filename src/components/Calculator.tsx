import React, { useState } from 'react';
import './Calculator.css';

interface CalculatorProps {
  onClose: () => void;
}

export default function Calculator({ onClose }: CalculatorProps) {
  const [display, setDisplay] = useState('');
  const [memory, setMemory] = useState<number | string>(0);

  const append = (value: string) => {
    setDisplay((prev) => prev + value);
  };

  const clearDisplay = () => {
    setDisplay('');
  };

  const deleteLast = () => {
    setDisplay((prev) => prev.slice(0, -1));
  };

  const getEvalNumber = () => {
    if (!display) return 0;
    // eslint-disable-next-line no-eval
    return Number(eval(display));
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
      setDisplay(String(Math.sqrt(getEvalNumber())));
    } catch {
      setDisplay('Error');
    }
  };

  const power = () => {
    try {
      if (!display) return;
      setDisplay(String(Math.pow(getEvalNumber(), 2)));
    } catch {
      setDisplay('Error');
    }
  };

  const cube = () => {
    try {
      if (!display) return;
      setDisplay(String(Math.pow(getEvalNumber(), 3)));
    } catch {
      setDisplay('Error');
    }
  };

  const inverse = () => {
    try {
      if (!display) return;
      setDisplay(String(1 / getEvalNumber()));
    } catch {
      setDisplay('Error');
    }
  };

  const factorial = () => {
    try {
      if (!display) return;
      const n = getEvalNumber();
      if (n < 0 || !Number.isInteger(n)) {
        setDisplay("Error");
        return;
      }
      let fact = 1;
      for (let i = 1; i <= n; i++) {
        fact *= i;
      }
      setDisplay(String(fact));
    } catch {
      setDisplay('Error');
    }
  };

  const pi = () => {
    setDisplay((prev) => prev + Math.PI.toFixed(8));
  };

  const sin = () => {
    try {
      if (!display) return;
      setDisplay(String(Math.sin((getEvalNumber() * Math.PI) / 180).toFixed(8)));
    } catch {
      setDisplay('Error');
    }
  };

  const cos = () => {
    try {
      if (!display) return;
      setDisplay(String(Math.cos((getEvalNumber() * Math.PI) / 180).toFixed(8)));
    } catch {
      setDisplay('Error');
    }
  };

  const tan = () => {
    try {
      if (!display) return;
      setDisplay(String(Math.tan((getEvalNumber() * Math.PI) / 180).toFixed(8)));
    } catch {
      setDisplay('Error');
    }
  };

  const log = () => {
    try {
      if (!display) return;
      setDisplay(String(Math.log10(getEvalNumber()).toFixed(8)));
    } catch {
      setDisplay('Error');
    }
  };

  const ln = () => {
    try {
      if (!display) return;
      setDisplay(String(Math.log(getEvalNumber()).toFixed(8)));
    } catch {
      setDisplay('Error');
    }
  };

  const absolute = () => {
    try {
      if (!display) return;
      setDisplay(String(Math.abs(getEvalNumber())));
    } catch {
      setDisplay('Error');
    }
  };

  const random = () => {
    setDisplay((prev) => prev + Math.random().toFixed(6));
  };

  const memoryStore = () => {
    setMemory(display);
  };

  const memoryRecall = () => {
    setDisplay((prev) => prev + memory);
  };

  const memoryClear = () => {
    setMemory(0);
  };

  return (
    <div className="calculator-modal-overlay" onClick={onClose}>
      <div className="casio-calculator" onClick={(e) => e.stopPropagation()}>
        <button className="casio-close-btn" onClick={onClose}>✕</button>
        
        <div className="casio-top">
          <div>
            <div className="casio-brand">CASIO</div>
            <div className="casio-model">fx-999EX</div>
          </div>
          <div className="casio-solar"></div>
        </div>

        <input type="text" className="casio-display" value={display} readOnly />

        <div className="casio-buttons">
          {/* Row 1 */}
          <button className="casio-btn casio-special" onClick={clearDisplay}>AC</button>
          <button className="casio-btn casio-special" onClick={deleteLast}>C</button>
          <button className="casio-btn casio-operator" onClick={() => append('%')}>%</button>
          <button className="casio-btn casio-operator" onClick={() => append('/')}>÷</button>
          <button className="casio-btn casio-operator" onClick={squareRoot}>√</button>

          {/* Row 2 */}
          <button className="casio-btn" onClick={() => append('7')}>7</button>
          <button className="casio-btn" onClick={() => append('8')}>8</button>
          <button className="casio-btn" onClick={() => append('9')}>9</button>
          <button className="casio-btn casio-operator" onClick={() => append('*')}>×</button>
          <button className="casio-btn casio-operator" onClick={() => append('-')}>−</button>

          {/* Row 3 */}
          <button className="casio-btn" onClick={() => append('4')}>4</button>
          <button className="casio-btn" onClick={() => append('5')}>5</button>
          <button className="casio-btn" onClick={() => append('6')}>6</button>
          <button className="casio-btn casio-operator" onClick={() => append('+')}>+</button>
          <button className="casio-btn casio-operator" onClick={power}>x²</button>

          {/* Row 4 */}
          <button className="casio-btn" onClick={() => append('1')}>1</button>
          <button className="casio-btn" onClick={() => append('2')}>2</button>
          <button className="casio-btn" onClick={() => append('3')}>3</button>
          <button className="casio-btn casio-equal" onClick={calculate}>=</button>
          <button className="casio-btn casio-operator" onClick={cube}>x³</button>

          {/* Row 5 */}
          <button className="casio-btn" onClick={() => append('0')}>0</button>
          <button className="casio-btn" onClick={() => append('.')}>.</button>
          <button className="casio-btn casio-operator" onClick={inverse}>1/x</button>
          <button className="casio-btn casio-operator" onClick={factorial}>x!</button>
          <button className="casio-btn casio-operator" onClick={pi}>π</button>

          {/* Row 6 */}
          <button className="casio-btn casio-operator" onClick={sin}>sin</button>
          <button className="casio-btn casio-operator" onClick={cos}>cos</button>
          <button className="casio-btn casio-operator" onClick={tan}>tan</button>
          <button className="casio-btn casio-operator" onClick={log}>log</button>
          <button className="casio-btn casio-operator" onClick={ln}>ln</button>

          {/* Row 7 */}
          <button className="casio-btn casio-memory" onClick={memoryStore}>MS</button>
          <button className="casio-btn casio-memory" onClick={memoryRecall}>MR</button>
          <button className="casio-btn casio-memory" onClick={memoryClear}>MC</button>
          <button className="casio-btn casio-operator" onClick={random}>Rnd</button>
          <button className="casio-btn casio-operator" onClick={absolute}>|x|</button>
        </div>

      </div>
    </div>
  );
}
