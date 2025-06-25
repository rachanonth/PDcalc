import React from 'react';

const Info = () => {
  return (
    <div className="calcplus-app-bg">
      <header className="calcplus-header">
        <h1 className="calcplus-title">Info</h1>
        <p className="calcplus-subtitle">About Peddose Calculator</p>
      </header>
      <main className="calcplus-main">
        <section className="calcplus-section">
          <h2 className="calcplus-results-title">Quick Links</h2>
          <div className="info-links">
            <a 
              href="https://www.craft.me/s/N5vDLsLLtyKPO3" 
              target="_blank" 
              rel="noopener noreferrer"
              className="info-link"
            >
              📚 Reference
            </a>
            <a 
              href="https://www.facebook.com/KeepMovingPharmacist" 
              target="_blank" 
              rel="noopener noreferrer"
              className="info-link"
            >
              🐛 Bug Report / Suggestion
            </a>
            <a 
              href="https://www.craft.me/s/3EKMocKUH9Ym5c" 
              target="_blank" 
              rel="noopener noreferrer"
              className="info-link"
            >
              📝 Changelog
            </a>
            <a 
              href="https://www.facebook.com/KeepMovingPharmacist" 
              target="_blank" 
              rel="noopener noreferrer"
              className="info-link"
            >
              👨‍⚕️ KMP (Keep Moving Pharmacist)
            </a>
          </div>
        </section>
        
        <section className="calcplus-section">
          <h2 className="calcplus-results-title">Disclaimer</h2>
          <div className="info-disclaimer">
            <p>
              ⚠️ <strong>Important:</strong> All calculations must be re-checked. 
              The shown results can be different from the calculated results because of rounding.
            </p>
            <p>
              This application is designed to assist healthcare professionals in pediatric medication dosing calculations. 
              Always verify results and follow institutional protocols.
            </p>
          </div>
        </section>
        
        <section className="calcplus-section">
          <h2 className="calcplus-results-title">About</h2>
          <div className="info-about">
            <p>
              <strong>Peddose Calculator</strong> is a comprehensive pediatric medication dosing tool designed for healthcare professionals.
            </p>
            <p>
              Features include:
            </p>
            <ul className="info-features">
              <li>💊 Main Calculator - Individual drug calculations</li>
              <li>📋 Package Calculator - Multi-drug calculations</li>
              <li>🚑 Emergency Calculator - Emergency & ICU drugs</li>
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Info; 