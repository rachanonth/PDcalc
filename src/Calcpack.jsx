import React, { useState } from 'react';
import Footer from './Footer';
import { Link } from "react-router-dom";
import medicationOptions from './Medicationplus';

const DrugsetCalculator = () => {
  const [weight, setWeight] = useState('10');
  const [results, setResults] = useState([]); // State to store calculated drug dosages

  const handleWeightChange = (e) => {
    setWeight(e.target.value);
  };

  const calculateDoses = () => {
    // Calculate doses based on weight
    const dosages = medicationOptions.map((drug) => {
      let dosage = 0;
      let line1 = '';
      let line2 = '';

      if (drug.type === 'syr') {
        let calcdose = parseFloat(weight) * parseFloat(drug.mkdose);
        line1 = calcdose.toFixed(1) + " mg/dose (" + drug.mkdose + " mg/kg/dose)";
        line2 = "Oral " + (calcdose / drug.volume).toFixed(1) + " mL " + drug.interval;

      } else if (drug.type === 'syrrange') {
        // Calculation logic for syr show  range dose
        let mindose = parseFloat(weight) * drug.mindose;
        let maxdose = parseFloat(weight) * drug.maxdose;
        line1 = mindose.toFixed(1) + " - " + maxdose.toFixed(1) + " mg/dose (" + drug.mindose + " - " + drug.maxdose + " mg/kg/dose)";
        line2 = "Oral " + (mindose / drug.volume).toFixed(1) + " - " + (maxdose / drug.volume).toFixed(1) + " mL " + drug.interval;
      } else if (drug.type === 'syrbyage') {
        // Calculation logic for syr by age type
        line1 = "Dose by age";
        line2 = drug.note;
      }
      else if (drug.type === 'favi') {
        let dose1 = parseFloat(weight) * 35;
        let dose2 = parseFloat(weight) * 15;
        line1 = "Day 1: 70 mg/kg/day, Day 2-5: 30mg/kg/day";
        line2 = "Day 1: " + dose1.toFixed(0) + " mg BID then Day 2-5: " + dose2.toFixed(0) + " mg BID";
      }
      else if (drug.type === 'tab') {
        // Calculation logic for tablet type
        let dose = parseFloat(weight) * drug.mkdose;
        line1 = dose.toFixed(0) + " mg/dose (" + drug.mkdose + " mg/kg/dose)";
        line2 = "Oral " + (dose / drug.volume).toFixed(1) + " cap/tab  " + drug.interval;
      }
      else if (drug.type === 'sac') {
        // Calculation logic for sac
        let dose = parseFloat(weight) * drug.mkdose;
        line1 = dose.toFixed(0) + " mg/dose (" + drug.mkdose + " mg/kg/dose)";
        line2 = "Oral " + (dose / drug.volume).toFixed(1) + " sac  " + drug.interval;
      }
      else if (drug.type === 'tabrange') {
        // Calculation logic for syr show  range dose
        let mindose = parseFloat(weight) * drug.mindose;
        let maxdose = parseFloat(weight) * drug.maxdose;
        line1 = mindose.toFixed(0) + " - " + maxdose.toFixed(0) + " mg/dose (" + drug.mindose + " - " + drug.maxdose + " mg/kg/dose)";
        line2 = "Oral " + (mindose / drug.volume).toFixed(1) + " - " + (maxdose / drug.volume).toFixed(1) + " cap/tab  " + drug.interval;
      }

      else if (drug.type === 'injrange') {
        // Calculation logic for syr show  range dose
        let mindose = parseFloat(weight) * drug.mindose;
        let maxdose = parseFloat(weight) * drug.maxdose;
        line1 = drug.mindose + " - " + drug.maxdose + " mg/kg/dose";
        line2 = "IV " + mindose.toLocaleString('en-US') + " - " + maxdose.toLocaleString('en-US') + " mg  " + drug.interval;
      }
      else if (drug.type === 'inj') {
        // Calculation logic for injection type
        let dose = parseFloat(weight) * drug.mkdose;
        line1 = dose.toFixed(0) + " mg/dose (" + drug.mkdose + " mg/kg/dose)";
        line2 = "IV " + dose.toLocaleString('en-US') + " mg " + drug.interval;
      }


      return { drugName: drug.label, dosage, note: drug.note, line1, line2, warning: drug.warning };
    });

    setResults(dosages); // Update the results state with calculated dosages
  };

  return (
    <div>
      <h2 className="title">🧒Medication Set</h2>
      <p><Link to="/">Basic</Link> | Set</p>
      <label>
        Weight:
        <input
          type="number"
          value={weight}
          onChange={handleWeightChange}
          className="weight-input"
          inputMode="decimal"
        /> kg
      </label>
      <p><button className="button-4" onClick={calculateDoses}>🖩 Calculate</button></p>

      {/* Display the calculated doses here */}
      {results.length > 0 && (
        <div className="dosage-list">
          <h3>Dosages:</h3>
          <ul className="dosage-list">
            {results.map((result, index) => (
              <li key={index}>
                <div className="drug-item">
                  <span className="drug-name">{result.drugName}</span>
                  <span className="line2">{result.line2}</span>

                  <div className="line1">{result.line1}</div>
                  <span className="warning">{result.warning}</span>

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