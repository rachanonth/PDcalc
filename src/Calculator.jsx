import React, { useState } from 'react';
import Select from 'react-select';

const Calculator = () => {
  const [weight, setWeight] = useState(10); // Default weight value
  const [selectedMedication, setSelectedMedication] = useState('');
  const [resultHistory, setResultHistory] = useState([]);

  // ---------------medication database---------------
 
  const medicationOptions = [
    { value: 'amx125', label: 'Amoxicillin 125mg/5ml', mkdose: 15,volume: 25, interval: 'q8 hr or TID ', ref:'mdx',},
    { value: 'amx250', label: 'Amoxicillin 250mg/5ml', mkdose: 15,volume: 50, interval: 'q8 hr or TID ', ref:'mdx',},
    { value: 'amx250h', label: 'Amoxicillin 250mg/5ml (high dose)', mkdose: 30,volume: 50, interval: 'q8 hr or TID ', ref:'mdx',},
    { value: 'amxc1200', label: 'Inj - Amox/clav 1.2 g in NSS 100 ml', mkdose: 45,volume: 12, interval: 'q12 hr', ref:'mdx',},
     { value: 'cpm4', label: 'CPM 4mg/5ml', mkdose: 0.35,volume: 0.8, interval: 'TID - QID ', ref:'mdx',},
     { value: 'ibp100', label: 'Ibuprofen 100mg/5ml', mkdose: 5,volume: 20, interval: 'PRN q6 - 8 hr ', ref:'mdx',},
    { value: 'pcm120', label: 'Paracetamol 120mg/5ml', mkdose: 10, volume: 24, interval: 'PRN q4 - 6 hr', ref:'mdx',},
    { value: 'pcm160', label: 'Paracetamol 160mg/5ml', mkdose: 10,volume: 32, interval: 'PRN q4 - 6 hr', ref:'mdx',},
    { value: 'pcm240', label: 'Paracetamol 240mg/5ml', mkdose: 10,volume: 48, interval: 'PRN q4 - 6 hr', ref:'mdx',},
    
  // ---------------medication database---------------
  ];
const handleClearHistory = () => {
    setResultHistory([]);
  };
  
   const handleCalculate = () => {
    const selectedMed = medicationOptions.find(option => option.value === selectedMedication);
    if (selectedMed) {
      const dose = parseFloat(weight) * selectedMed.mkdose;
      const calculatedDose = dose.toFixed(1);

      // Calculate volume using the formula: volume = dose / medicationVolume
      const volume = dose / selectedMed.volume;
      const calculatedVolume = volume.toFixed(1);

      const newResult = {
        
        medication: selectedMedication,
        dose: calculatedDose,
        volume: calculatedVolume,
        interval: selectedMed.interval,
        drugname: selectedMed.label,
        mkdose: selectedMed.mkdose,
        ref: selectedMed.ref,
        weight: weight,
        
      };

      setResultHistory([newResult, ...resultHistory]);
      
    }
  };


  return (
    <div>
      <h2>Pediatric Dose Calculator</h2>
      <label>
        Infant/Child Weight:
        <input
          type="range"
          min="3"
          max="50"
          step="0.5"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
        />
        <input
          type="number"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          className="weight-input" 
        /> kg
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
        <button className="button-4" onClick={handleCalculate}>Calculate</button>
       <button className="button-4" onClick={handleClearHistory}>Clear</button>
      {resultHistory.length > 0 && (
        <div>
          <h3>Result:</h3>
          <ol>
            {resultHistory.map((result, index) => (
              <li key={index}>
                <p> <b>{result.drugname} </b>(wt {result.weight} kg) </p>
                <p className="dose">Take {result.volume} mL/dose {result.interval}</p>
                <p> </p>
                <p className="note"> note: {result.dose} mg/dose ({result.mkdose} mg/kg/dose) | ref: {result.ref}</p>
              </li>
            ))}
          </ol>
        </div>
      )}
     <p> Disclaimer: Calculations must be re-checked. The shown results can be different from the calculated results because of rounding.</p>
    </div>
  );
};

export default Calculator;