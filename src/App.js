import React, { useEffect, useState } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const [scanResult, setScanResult] = useState(null);

  useEffect(() => {
    const scanner = new Html5QrcodeScanner('reader', {
      qrbox: {
        width: 250,
        height: 250,
      },
      fps: 5,
    });

    // Use an async function for the success callback
    const success = async (result) => {
      await scanner.clear();
      setScanResult(result);
    };

    const error = (err) => {
      console.warn(err);
    };

    scanner.render(success, error);

    // Cleanup function
    return () => {
      scanner.clear();
    };
  }, []);

  return (
    <div className="App container mt-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card bg-light">
            <div className="card-body">
              <h1 className="card-title mb-4 text-primary">QR Code Scanner</h1>
              {scanResult ? (
                <div>
                  <p className="lead">Scanned Result:</p>
                  <a
                    href={'http://' + scanResult}
                    className="btn btn-success btn-lg"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {scanResult}
                  </a>
                </div>
              ) : (
                <div id="reader" className="text-center"></div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
