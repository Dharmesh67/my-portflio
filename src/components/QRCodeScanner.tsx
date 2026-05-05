import React, { useEffect, useState } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import './QRCodeScanner.css';

interface QRCodeScannerProps {
  onClose: () => void;
}

export default function QRCodeScanner({ onClose }: QRCodeScannerProps) {
  const [result, setResult] = useState<string | null>(null);
  const [status, setStatus] = useState('Camera starting...');

  useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      "reader",
      {
        fps: 10,
        qrbox: { width: 250, height: 250 }
      },
      false
    );

    function onScanSuccess(decodedText: string) {
      setResult(decodedText);
      setStatus("QR Code Scanned Successfully");
    }

    function onScanError(error: any) {
      // ignore errors
    }

    scanner.render(onScanSuccess, onScanError);

    return () => {
      try {
        scanner.clear().catch(err => {
          console.error("Failed to clear html5QrcodeScanner. ", err);
        });
      } catch (err) {
        console.error("Failed to clear html5QrcodeScanner synchronously. ", err);
      }
    };
  }, []);

  const copyResult = () => {
    if (result) {
      navigator.clipboard.writeText(result);
      alert("Copied Successfully");
    }
  };

  return (
    <div className="qr-scanner-overlay" onClick={onClose}>
      <div className="qr-scanner-container" onClick={(e) => e.stopPropagation()}>
        <button className="qr-close-btn" onClick={onClose}>✕</button>
        
        <h1>QR Scanner</h1>

        <div id="reader"></div>

        <div className="qr-status">{status}</div>

        <div className="qr-result-box" id="result">
          {result ? (
            <>
              <b>Scanned Result:</b><br/><br/>
              {result.startsWith('http') ? (
                <a href={result} target="_blank" rel="noopener noreferrer">{result}</a>
              ) : (
                <span>{result}</span>
              )}
            </>
          ) : (
            'Scan a QR code'
          )}
        </div>

        {result && (
          <button className="qr-action-btn" onClick={copyResult}>Copy Result</button>
        )}
      </div>
    </div>
  );
}
