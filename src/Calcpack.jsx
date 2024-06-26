import React, { useState, useRef } from 'react';
import Footer from './Footer';
import { Link } from "react-router-dom";
import medicationOptions from './Medication';

const DrugsetCalculator = () => {
  const [weight, setWeight] = useState('10');
  const [selectedMedications, setSelectedMedications] = useState([]);
  const [results, setResults] = useState([]);
  const [columnLayout, setColumnLayout] = useState(1); // New state for column layout

  const handleWeightChange = (e) => {
    setWeight(e.target.value);
  };

  const previousMedicationsRef = useRef();

  if (!previousMedicationsRef.current) {
    previousMedicationsRef.current = selectedMedications;
  }

  const handleMedicationChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
    setSelectedMedications(selectedOptions);
  };

  const calculateDoses = () => {
    const medsToCalculate = selectedMedications.length > 0 ? selectedMedications : previousMedicationsRef.current;

    const dosages = medsToCalculate.map((selectedMed) => {
      const drug = medicationOptions.find(med => med.label === selectedMed);
      if (drug) {
        let line1 = '';
        let line2 = '';

        if (drug.type === 'syr') {
          let calcdose = parseFloat(weight) * parseFloat(drug.mkdose);
          line1 = calcdose.toFixed(1) + " mg/dose (" + drug.mkdose + " mg/kg/dose)";
          line2 = "Oral " + (calcdose / drug.volume).toFixed(1) + " mL " + drug.interval;
        } else if (drug.type === 'syrrange') {
          let mindose = parseFloat(weight) * drug.mindose;
          let maxdose = parseFloat(weight) * drug.maxdose;
          line1 = mindose.toFixed(1) + " - " + maxdose.toFixed(1) + " mg/dose (" + drug.mindose + " - " + drug.maxdose + " mg/kg/dose)";
          line2 = "Oral " + (mindose / drug.volume).toFixed(1) + " - " + (maxdose / drug.volume).toFixed(1) + " mL " + drug.interval;
        } else if (drug.type === 'syrbyage') {
          line1 = "Dose by age";
          line2 = drug.note;
        } else if (drug.type === 'favi') {
          let dose1 = parseFloat(weight) * 35;
          let dose2 = parseFloat(weight) * 15;
          line1 = "Day 1: 70 mg/kg/day, Day 2-5: 30mg/kg/day";
          line2 = "Day 1: " + dose1.toFixed(0) + " mg BID then Day 2-5: " + dose2.toFixed(0) + " mg BID";
        } else if (drug.type === 'tab') {
          let dose = parseFloat(weight) * drug.mkdose;
          line1 = dose.toFixed(0) + " mg/dose (" + drug.mkdose + " mg/kg/dose)";
          line2 = "Oral " + (dose / drug.volume).toFixed(1) + " cap/tab  " + drug.interval;
        } else if (drug.type === 'sac') {
          let dose = parseFloat(weight) * drug.mkdose;
          line1 = dose.toFixed(0) + " mg/dose (" + drug.mkdose + " mg/kg/dose)";
          line2 = "Oral " + (dose / drug.volume).toFixed(1) + " sac  " + drug.interval;
        } else if (drug.type === 'tabrange') {
          let mindose = parseFloat(weight) * drug.mindose;
          let maxdose = parseFloat(weight) * drug.maxdose;
          line1 = mindose.toFixed(0) + " - " + maxdose.toFixed(0) + " mg/dose (" + drug.mindose + " - " + drug.maxdose + " mg/kg/dose)";
          line2 = "Oral " + (mindose / drug.volume).toFixed(1) + " - " + (maxdose / drug.volume).toFixed(1) + " cap/tab  " + drug.interval;
        } else if (drug.type === 'injrange') {
          let mindose = parseFloat(weight) * drug.mindose;
          let maxdose = parseFloat(weight) * drug.maxdose;
          line1 = drug.mindose + " - " + drug.maxdose + " mg/kg/dose";
          line2 = "IV " + mindose.toLocaleString('en-US') + " - " + maxdose.toLocaleString('en-US') + " mg  " + drug.interval;
        } else if (drug.type === 'inj') {
          let dose = parseFloat(weight) * drug.mkdose;
          line1 = dose.toFixed(0) + " mg/dose (" + drug.mkdose + " mg/kg/dose)";
          line2 = "IV " + dose.toLocaleString('en-US') + " mg " + drug.interval;
        }

        return { drugName: drug.label, note: drug.note, line1, line2, warning: drug.warning };
      }
      return null;
    }).filter(result => result !== null);

    setResults(dosages);
  };

  // Function to handle column layout change
  const changeColumnLayout = (columns) => {
    setColumnLayout(columns);
  };

  return (
    <div className="container">
      <h2 className="title">🧒Medication Package</h2>
      <p><Link to="/">Basic</Link> |📋 Package</p>

      <div className="input-group">
        <label htmlFor="medication-select" className="visually-hidden">Select Medications</label>
        <select 
          id="medication-select"
          multiple 
          value={selectedMedications} 
          onChange={handleMedicationChange}
          className="minimalist-select"
        >
          {medicationOptions.map((medication) => (
            <option key={medication.label} value={medication.label}>
              {medication.label}
            </option>
          ))}
        </select>
      </div>

      <div className="input-group">
        <label htmlFor="weight-input">Weight (kg):</label>
        <input
          id="weight-input"
          type="number"
          value={weight}
          onChange={handleWeightChange}
          className="minimalist-input"
          inputMode="decimal"
        />
      </div>

      <button className="minimalist-button calculate-button" onClick={calculateDoses}>Calculate</button>

      <div className="layout-buttons">
        {[1, 2, 3].map((cols) => (
          <button 
            key={cols}
            className={`minimalist-button ${columnLayout === cols ? 'active' : ''}`}
            onClick={() => changeColumnLayout(cols)}
          >
            {cols}
          </button>
        ))}
      </div>

      {results.length > 0 && (
        <div className="dosage-list">
          <h3>Dosages:</h3>
          <ul className={`dosage-list column-${columnLayout}`}>
            {results.map((result, index) => (
              <li key={index} className="drug-item">
                <div className="drug-header">
                  <p className="drug-name">{result.drugName}</p>
                  {result.warning && <span className="warning">{result.warning}</span>}
                </div>
                <div className="drug-details">
                  <p className="line2">{result.line2}</p>
                  <p className="line1">{result.line1}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
      <Footer />
    </div>
  );
  };

export default DrugsetCalculator;