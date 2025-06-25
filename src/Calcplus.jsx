import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import medicationOptions from './Medicationplus';

const TYPE_GROUPS = {
  Syrup: ["syr", "syrrange", "syrbyage", "favi", "sac"],
  Tablet: ["tab", "tabrange"],
  Injection: ["inj", "injrange"],
};
const TYPE_GROUP_KEYS = Object.keys(TYPE_GROUPS);
const FILTER_STORAGE_KEY = 'calcplus_typeFilters';

const Calculator = () => {
  // Load from localStorage or default to all checked
  const getInitialFilters = () => {
    const saved = localStorage.getItem(FILTER_STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.every(g => TYPE_GROUP_KEYS.includes(g))) {
          return parsed;
        }
      } catch {}
    }
    return [...TYPE_GROUP_KEYS];
  };

  const [weight, setWeight] = useState(10); // Default weight value
  const [selectedMedication, setSelectedMedication] = useState('');
  const [resultHistory, setResultHistory] = useState([]);
  const [typeFilters, setTypeFilters] = useState(getInitialFilters);

  // Save filter state to localStorage on change
  useEffect(() => {
    localStorage.setItem(FILTER_STORAGE_KEY, JSON.stringify(typeFilters));
  }, [typeFilters]);

  const handleTypeFilterChange = (group) => {
    setTypeFilters(prev => {
      let next;
      if (prev.includes(group)) {
        next = prev.filter(g => g !== group);
      } else {
        next = [...prev, group];
      }
      // Prevent all unchecked: if none checked, keep all checked
      if (next.length === 0) return [...TYPE_GROUP_KEYS];
      return next;
    });
    setSelectedMedication(''); // Reset selected medication when filter changes
  };

  // Get all types from checked groups
  const selectedTypes = typeFilters.length === 0
    ? null
    : typeFilters.flatMap(group => TYPE_GROUPS[group]);

  const filteredOptions = !selectedTypes
    ? medicationOptions
    : medicationOptions.filter(opt => selectedTypes.includes(opt.type));

  const handleClearHistory = () => {
    setResultHistory([]);
  };

  const handleCalculate = () => {
    if (!weight || isNaN(weight) || parseFloat(weight) <= 0) {
      alert("Please enter a valid weight (kg) before calculating.");
      return;
    }
    const selectedMed = medicationOptions.find(option => option.value === selectedMedication);
    if (selectedMed) {
      let calculatedDose = null;
      let calculatedVolume = null;
      if (selectedMed.type === "syr") {
        const dose = parseFloat(weight) * selectedMed.mkdose;
        calculatedDose = dose.toFixed(1) + " mg/dose (" + selectedMed.mkdose + " mg/kg/dose)";
        calculatedVolume = "Oral " + (dose / selectedMed.volume).toFixed(1) + " mL " + selectedMed.interval;
      } else if (selectedMed.type === "syrrange") {
        const mindose = parseFloat(weight) * selectedMed.mindose;
        const maxdose = parseFloat(weight) * selectedMed.maxdose;
        calculatedDose = mindose.toFixed(1) + " - " + maxdose.toFixed(1) + " mg/dose (" + selectedMed.mindose + " - " + selectedMed.maxdose + " mg/kg/dose)";
        calculatedVolume = "Oral " + (mindose / selectedMed.volume).toFixed(1) + " - " + (maxdose / selectedMed.volume).toFixed(1) + " mL " + selectedMed.interval;
      } else if (selectedMed.type === "syrbyage") {
        calculatedDose = "Dose by age";
        calculatedVolume = selectedMed.note;
      } else if (selectedMed.type === "favi") {
        const dose1 = parseFloat(weight) * 35;
        const dose2 = parseFloat(weight) * 15;
        calculatedDose = "Day 1: 70 mg/kg/day, Day 2-5: 30mg/kg/day";
        calculatedVolume = "Day 1: "+ dose1.toFixed(0) + " mg BID then Day 2-5: " + dose2.toFixed(0) + " mg BID";
      } else if (selectedMed.type === "tab") {
        const dose = parseFloat(weight) * selectedMed.mkdose;
        calculatedDose = dose.toFixed(0) + " mg/dose (" + selectedMed.mkdose + " mg/kg/dose)";
        calculatedVolume = "Oral " + (dose / selectedMed.volume).toFixed(1) + " cap/tab  " + selectedMed.interval;
      } else if (selectedMed.type === "sac") {
        const dose = parseFloat(weight) * selectedMed.mkdose;
        calculatedDose = dose.toFixed(0) + " mg/dose (" + selectedMed.mkdose + " mg/kg/dose)";
        calculatedVolume = "Oral " + (dose / selectedMed.volume).toFixed(1) + " sac  " + selectedMed.interval;
      } else if (selectedMed.type === "tabrange") {
        const mindose = parseFloat(weight) * selectedMed.mindose;
        const maxdose = parseFloat(weight) * selectedMed.maxdose;
        calculatedDose = mindose.toFixed(0) + " - " + maxdose.toFixed(0) + " mg/dose (" + selectedMed.mindose + " - " + selectedMed.maxdose + " mg/kg/dose)";
        calculatedVolume = "Oral " + (mindose / selectedMed.volume).toFixed(1) + " - " + (maxdose / selectedMed.volume).toFixed(1) + " cap/tab  " + selectedMed.interval;
      } else if (selectedMed.type === "injrange") {
        const mindose = parseFloat(weight) * selectedMed.mindose;
        const maxdose = parseFloat(weight) * selectedMed.maxdose;
        calculatedDose = selectedMed.mindose + " - " + selectedMed.maxdose + " mg/kg/dose";
        calculatedVolume = "IV " + mindose.toLocaleString('en-US') + " - " + maxdose.toLocaleString('en-US') + " mg  " + selectedMed.interval;
      } else if (selectedMed.type === "inj") {
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
    <div className="calcplus-app-bg">
      <header className="calcplus-header">
        <h1 className="calcplus-title">Peddose Calculator</h1>
        <p className="calcplus-subtitle">Pediatric Medication Dosing Calculator</p>
      </header>
      <main className="calcplus-main">
        <section className="calcplus-section calcplus-input-section">
          <div className="calcplus-form-group">
            <label htmlFor="weight-input" className="calcplus-label">Weight (kg)</label>
            <input
              id="weight-input"
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              onFocus={() => setWeight("")}
              className="calcplus-input"
              inputMode="decimal"
              min="0"
              step="any"
              placeholder="Enter weight"
            />
          </div>
          <div className="calcplus-form-group">
            <label className="calcplus-label">Filter by Medication Type</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
              {TYPE_GROUP_KEYS.map(group => (
                <label key={group} style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.98rem' }}>
                  <input
                    type="checkbox"
                    checked={typeFilters.includes(group)}
                    onChange={() => handleTypeFilterChange(group)}
                  />
                  {group}
                </label>
              ))}
            </div>
          </div>
          <div className="calcplus-form-group">
            <label htmlFor="medication-select" className="calcplus-label">Select Medication</label>
            <Select
              inputId="medication-select"
              options={filteredOptions}
              value={filteredOptions.find(option => option.value === selectedMedication) || null}
              onChange={selectedOption => setSelectedMedication(selectedOption.value)}
              placeholder="Select Medication"
              classNamePrefix="calcplus-select"
              isDisabled={filteredOptions.length === 0}
            />
          </div>
          <div className="calcplus-button-group">
            <button className="calcplus-btn" onClick={handleCalculate}> Calculate</button>
            <button className="calcplus-btn calcplus-btn-secondary" onClick={handleClearHistory}>↻ Clear</button>
          </div>
        </section>
        {resultHistory.length > 0 && (
          <section className="calcplus-section calcplus-results-section">
            <h2 className="calcplus-results-title">Dosages</h2>
            <ol className="calcplus-results-list">
              {resultHistory.map((result, index) => (
                <li key={index} className="calcplus-result-card">
                  <div className="calcplus-result-header">
                    <span className="calcplus-result-drug">{result.drugname}</span>
                    <span className="calcplus-result-weight">(wt {result.weight} kg)</span>
                  </div>
                  <div className="calcplus-result-dose" dangerouslySetInnerHTML={{ __html: result.line1.replace(/\n/g, '<br>') }} />
                  <div className="calcplus-result-note">📄 {result.line2}  | ref: {result.ref}</div>
                  {result.warning && result.warning.trim() !== '' && (
                    <div className="calcplus-result-warning">⚠️ {result.warning}</div>
                  )}
                </li>
              ))}
            </ol>
          </section>
        )}
      </main>
    </div>
  );
};

export default Calculator;