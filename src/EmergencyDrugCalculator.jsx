import React, { useState } from 'react';
import drugs from './Medicationemer';

const EmergencyDrugCalculator = () => {
  const [weight, setWeight] = useState('10');
  const [results, setResults] = useState([]);

  const handleWeightChange = (e) => {
    setWeight(e.target.value);
  };

  const calculateDoses = () => {
    const dosages = drugs.map((drug) => {
      let dosage = '';
      if (drug.type === 'single') {
        let calcdose = parseFloat(weight) * drug.dose;
        const hasMoreThanThreeDecimals = calcdose.toString().split('.')[1]?.length > 3;
        calcdose = hasMoreThanThreeDecimals ? calcdose.toFixed(3) : calcdose;
        dosage = calcdose + ' ' + drug.unit;
      } else if (drug.type === 'range') {
        let calcdosemin = parseFloat(weight) * drug.dosemin;
        let calcdosemax = parseFloat(weight) * drug.dosemax;
        const hasMoreThanThreeDecimalsmin = calcdosemin.toString().split('.')[1]?.length > 3;
        const hasMoreThanThreeDecimalsmax = calcdosemax.toString().split('.')[1]?.length > 3;
        calcdosemin = hasMoreThanThreeDecimalsmin ? calcdosemin.toFixed(3) : calcdosemin;
        calcdosemax = hasMoreThanThreeDecimalsmax ? calcdosemax.toFixed(3) : calcdosemax;
        dosage = calcdosemin + ' - ' + calcdosemax + ' ' + drug.unit;
      } else if (drug.type === 'nocalc') {
        dosage = drug.unit;
      } else if (drug.type === 'dextrose') {
        if (weight < 5) { dosage = '10%DW ' + parseFloat(weight) * 10 + ' ' + drug.unit; }
        else if (weight < 44) { dosage = '25%DW ' + parseFloat(weight) * 4 + ' ' + drug.unit; }
        else { dosage = '50%DW ' + parseFloat(weight) * 2 + ' ' + drug.unit; }
      }
      return { drugName: drug.drugName, dosage, note: drug.note };
    });
    setResults(dosages);
  };

  return (
    <div className="calcplus-app-bg">
      <header className="calcplus-header">
        <h1 className="calcplus-title">Peddose Emergency & ICU</h1>
        <p className="calcplus-subtitle">Emergency & ICU Drug Calculator</p>
      </header>
      <main className="calcplus-main">
        <section className="calcplus-section calcplus-input-section">
          <div className="calcplus-form-group">
            <label htmlFor="weight-input" className="calcplus-label">Weight (kg)</label>
            <input
              id="weight-input"
              type="number"
              value={weight}
              onChange={handleWeightChange}
              className="calcplus-input"
              inputMode="decimal"
              min="0"
              step="any"
              placeholder="Enter weight"
            />
          </div>
          <div className="calcplus-button-group">
            <button className="calcplus-btn" onClick={calculateDoses}>Calculate</button>
          </div>
        </section>
        {results.length > 0 && (
          <div className="dosage-list">
            <h3>Dosages:</h3>
            <ul className="dosage-list">
              {results.map((result, index) => (
                <li key={index}>
                  <span className="drug-name">{result.drugName}</span> <span className="dosage">{result.dosage}</span>  <span className="warning">{result.note}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </main>
    </div>
  );
};

export default EmergencyDrugCalculator;
