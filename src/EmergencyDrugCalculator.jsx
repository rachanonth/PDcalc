import React, { useState } from 'react';
import Footer from './Footer';
import { Link } from "react-router-dom";
import drugs from './Medicationemer';

const EmergencyDrugCalculator = () => {
  const [weight, setWeight] = useState('10');
  const [results, setResults] = useState([]); // State to store calculated drug dosages



  const handleWeightChange = (e) => {
    setWeight(e.target.value);
  };

  const calculateDoses = () => {
    // Calculate doses for emergency drugs based on weight
    const dosages = drugs.map((drug) => {
      let dosage = 0;


      if (drug.type === 'single') {
        let calcdose = parseFloat(weight) * drug.dose;
        const hasMoreThanThreeDecimals = calcdose.toString().split('.')[1]?.length > 3;
        calcdose = hasMoreThanThreeDecimals ? calcdose.toFixed(3) : calcdose;
        dosage = calcdose + " " + drug.unit;
      } else if (drug.type === 'range') {
        let calcdosemin = parseFloat(weight) * drug.dosemin;
        let calcdosemax = parseFloat(weight) * drug.dosemax;
        const hasMoreThanThreeDecimalsmin = calcdosemin.toString().split('.')[1]?.length > 3;
        const hasMoreThanThreeDecimalsmax = calcdosemax.toString().split('.')[1]?.length > 3;
        calcdosemin = hasMoreThanThreeDecimalsmin ? calcdosemin.toFixed(3) : calcdosemin;
        calcdosemax = hasMoreThanThreeDecimalsmax ? calcdosemax.toFixed(3) : calcdosemax;
        dosage = calcdosemin + " - " + calcdosemax + " " + drug.unit;
      } else if (drug.type === 'nocalc') {
        dosage = drug.unit;
      } else if (drug.type === 'dextrose') {
        if (weight < 5) { dosage = "10%DW " + parseFloat(weight) * 10 + " " + drug.unit; }
        else if (weight < 44) { dosage = "25%DW " + parseFloat(weight) * 4 + " " + drug.unit; }
        else { dosage = "50%DW " + parseFloat(weight) * 2 + " " + drug.unit; }
      }

      return { drugName: drug.drugName, dosage, note: drug.note };
    });

    setResults(dosages); // Update the results state with calculated dosages
  };

  return (
    <div>
      <h2 className="title">🧒Peddose Emergency & ICU</h2>
      <p><Link to="/">Basic</Link> | 🚑Emer</p>
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
                <span className="drug-name">{result.drugName}</span> <span className="dosage">{result.dosage}</span>  <span className="warning">{result.note}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default EmergencyDrugCalculator;
