import React, { useState } from 'react';
import Select from 'react-select';
import medicationOptions from './Medicationplus';
import Footer from './Footer';
import { Link } from "react-router-dom";

const Calculator = () => {
  const [weight, setWeight] = useState(10); // Default weight value
  const [selectedMedication, setSelectedMedication] = useState('');
  const [resultHistory, setResultHistory] = useState([]);


  const handleClearHistory = () => {
    setResultHistory([]);
  };

  const handleCalculate = () => {
    const selectedMed = medicationOptions.find(option => option.value === selectedMedication);

    if (selectedMed) {
      let calculatedDose = null;
      let calculatedVolume = null;

      if (selectedMed.type === "syr") {
        // Calculation logic for syr type
        const dose = parseFloat(weight) * selectedMed.mkdose;
        calculatedDose = dose.toFixed(1) + " mg/dose (" + selectedMed.mkdose + " mg/kg/dose)";
        calculatedVolume = "Oral " + (dose / selectedMed.volume).toFixed(1) + " mL " + selectedMed.interval;
      } else if (selectedMed.type === "syrrange") {
        // Calculation logic for syr show  range dose
        const mindose = parseFloat(weight) * selectedMed.mindose;
        const maxdose = parseFloat(weight) * selectedMed.maxdose;
        calculatedDose = mindose.toFixed(1) + " - " + maxdose.toFixed(1) + " mg/dose (" + selectedMed.mindose + " - " + selectedMed.maxdose + " mg/kg/dose)";
        calculatedVolume = "Oral " + (mindose / selectedMed.volume).toFixed(1) + " - " + (maxdose / selectedMed.volume).toFixed(1) + " mL " + selectedMed.interval;
      } else if (selectedMed.type === "syrbyage") {
        // Calculation logic for syr by age type
        calculatedDose = "Dose by age";
        calculatedVolume = selectedMed.note;
      } else if (selectedMed.type === "favi") {
        const dose1 = parseFloat(weight) * 35;
        const dose2 = parseFloat(weight) * 15;
        calculatedDose = "Day 1: 70 mg/kg/day, Day 2-5: 30mg/kg/day";
        calculatedVolume = "Day 1: "+ dose1.toFixed(0) + " mg BID then Day 2-5: " + dose2.toFixed(0) + " mg BID";
      } else if (selectedMed.type === "tab") {
        // Calculation logic for tablet type
        const dose = parseFloat(weight) * selectedMed.mkdose;
        calculatedDose = dose.toFixed(0) + " mg/dose (" + selectedMed.mkdose + " mg/kg/dose)";
        calculatedVolume = "Oral " + (dose / selectedMed.volume).toFixed(1) + " cap/tab  " + selectedMed.interval;
        } else if (selectedMed.type === "sac") {
          // Calculation logic for sac
          const dose = parseFloat(weight) * selectedMed.mkdose;
          calculatedDose = dose.toFixed(0) + " mg/dose (" + selectedMed.mkdose + " mg/kg/dose)";
          calculatedVolume = "Oral " + (dose / selectedMed.volume).toFixed(1) + " sac  " + selectedMed.interval;
      } else if (selectedMed.type === "tabrange") {
        // Calculation logic for syr show  range dose
        const mindose = parseFloat(weight) * selectedMed.mindose;
        const maxdose = parseFloat(weight) * selectedMed.maxdose;
        calculatedDose = mindose.toFixed(0) + " - " + maxdose.toFixed(0) + " mg/dose (" + selectedMed.mindose + " - " + selectedMed.maxdose + " mg/kg/dose)";
        calculatedVolume = "Oral " + (mindose / selectedMed.volume).toFixed(1) + " - " + (maxdose / selectedMed.volume).toFixed(1) + " cap/tab  " + selectedMed.interval;
      } else if (selectedMed.type === "injrange") {
        // Calculation logic for syr show  range dose
        const mindose = parseFloat(weight) * selectedMed.mindose;
        const maxdose = parseFloat(weight) * selectedMed.maxdose;
        calculatedDose = selectedMed.mindose + " - " + selectedMed.maxdose + " mg/kg/dose";
        calculatedVolume = "IV " + mindose.toLocaleString('en-US') + " - " + maxdose.toLocaleString('en-US') + " mg  " + selectedMed.interval;
      } else if (selectedMed.type === "inj") {
        // Calculation logic for injection type
        const dose = parseFloat(weight) * selectedMed.mkdose;
        calculatedDose = dose.toFixed(0) + " mg/dose (" + selectedMed.mkdose + " mg/kg/dose)";
        calculatedVolume = "IV " + dose.toLocaleString('en-US') + " mg " + selectedMed.interval;
      }

      const newResult = {
        medication: selectedMedication,
        line1: calculatedVolume,
        line2: calculatedDose,
        drugname: selectedMed.label,
        mkdose: selectedMed.mkdose,
        ref: selectedMed.ref,
        warning: selectedMed.warning,
        weight: weight,
      };

      setResultHistory([newResult, ...resultHistory]);
    }

  };

  return (
    <div>
      <h2 className="title">🧒Peddose Plus</h2>
      <p><Link to="/">Basic</Link> | ➕Plus </p>
      <label>
        <p>Weight:
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            onFocus={() => setWeight("")} // Set the weight to an empty string on focus
            className="weight-input"
            inputMode="decimal"
          /> kg
        </p>


      </label>
      <label>
        <p>Select Medication: </p>
        <Select
          options={medicationOptions}
          value={medicationOptions.find(option => option.value === selectedMedication)}
          onChange={selectedOption => setSelectedMedication(selectedOption.value)}
          placeholder="Select Medication"
        />
      </label>
      <button className="button-4" onClick={handleCalculate}>🖩 Calculate</button>
      <button className="button-4" onClick={handleClearHistory}>↻ Clear</button>
      {resultHistory.length > 0 && (
        <div>
          <h3>Dosages:</h3>
          <ol>
            {resultHistory.map((result, index) => (
              <li key={index}>
                <p> <b>{result.drugname} </b>(wt {result.weight} kg) </p>
                <div className="dose" dangerouslySetInnerHTML={{ __html: result.line1.replace(/\n/g, '<br>') }} />
                <p className="note">📄 {result.line2}  | ref: {result.ref}</p>
                <p className="warning">⚠️ {result.warning}  </p>
              </li>
            ))}
          </ol>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Calculator;