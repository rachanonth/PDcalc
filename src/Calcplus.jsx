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
const WEIGHT_STORAGE_KEY = 'peddose_weight';

const getInitialWeight = () => {
  const saved = localStorage.getItem(WEIGHT_STORAGE_KEY);
  const parsed = parseFloat(saved);
  return (!isNaN(parsed) && parsed > 0) ? parsed : 10;
};

const computeResult = (medValue, w) => {
  const selectedMed = medicationOptions.find(option => option.value === medValue);
  if (!selectedMed) return null;
  const wt = parseFloat(w);

  let calculatedDose = null;
  let calculatedVolume = null;

  if (selectedMed.type === "syr") {
    const dose = wt * selectedMed.mkdose;
    calculatedDose = dose.toFixed(1) + " mg/dose (" + selectedMed.mkdose + " mg/kg/dose)";
    calculatedVolume = "Oral " + (dose / selectedMed.volume).toFixed(1) + " mL " + selectedMed.interval;
  } else if (selectedMed.type === "syrrange") {
    const mindose = wt * selectedMed.mindose;
    const maxdose = wt * selectedMed.maxdose;
    calculatedDose = mindose.toFixed(1) + " - " + maxdose.toFixed(1) + " mg/dose (" + selectedMed.mindose + " - " + selectedMed.maxdose + " mg/kg/dose)";
    calculatedVolume = "Oral " + (mindose / selectedMed.volume).toFixed(1) + " - " + (maxdose / selectedMed.volume).toFixed(1) + " mL " + selectedMed.interval;
  } else if (selectedMed.type === "syrbyage") {
    calculatedDose = "Dose by age";
    calculatedVolume = selectedMed.note;
  } else if (selectedMed.type === "favi") {
    const dose1 = wt * 35;
    const dose2 = wt * 15;
    calculatedDose = "Day 1: 70 mg/kg/day, Day 2-5: 30mg/kg/day";
    calculatedVolume = "Day 1: " + dose1.toFixed(0) + " mg BID then Day 2-5: " + dose2.toFixed(0) + " mg BID";
  } else if (selectedMed.type === "tab") {
    const dose = wt * selectedMed.mkdose;
    calculatedDose = dose.toFixed(0) + " mg/dose (" + selectedMed.mkdose + " mg/kg/dose)";
    calculatedVolume = "Oral " + (dose / selectedMed.volume).toFixed(1) + " cap/tab  " + selectedMed.interval;
  } else if (selectedMed.type === "sac") {
    const dose = wt * selectedMed.mkdose;
    calculatedDose = dose.toFixed(0) + " mg/dose (" + selectedMed.mkdose + " mg/kg/dose)";
    calculatedVolume = "Oral " + (dose / selectedMed.volume).toFixed(1) + " sac  " + selectedMed.interval;
  } else if (selectedMed.type === "tabrange") {
    const mindose = wt * selectedMed.mindose;
    const maxdose = wt * selectedMed.maxdose;
    calculatedDose = mindose.toFixed(0) + " - " + maxdose.toFixed(0) + " mg/dose (" + selectedMed.mindose + " - " + selectedMed.maxdose + " mg/kg/dose)";
    calculatedVolume = "Oral " + (mindose / selectedMed.volume).toFixed(1) + " - " + (maxdose / selectedMed.volume).toFixed(1) + " cap/tab  " + selectedMed.interval;
  } else if (selectedMed.type === "injrange") {
    const mindose = wt * selectedMed.mindose;
    const maxdose = wt * selectedMed.maxdose;
    calculatedDose = selectedMed.mindose + " - " + selectedMed.maxdose + " mg/kg/dose";
    calculatedVolume = "IV " + mindose.toLocaleString('en-US') + " - " + maxdose.toLocaleString('en-US') + " mg  " + selectedMed.interval;
  } else if (selectedMed.type === "inj") {
    const dose = wt * selectedMed.mkdose;
    calculatedDose = dose.toFixed(0) + " mg/dose (" + selectedMed.mkdose + " mg/kg/dose)";
    calculatedVolume = "IV " + dose.toLocaleString('en-US') + " mg " + selectedMed.interval;
  }

  return {
    medication: medValue,
    line1: calculatedVolume,
    line2: calculatedDose,
    drugname: selectedMed.label,
    ref: selectedMed.ref,
    warning: selectedMed.warning,
    weight: w,
  };
};

const Calculator = () => {
  const getInitialFilters = () => {
    const saved = localStorage.getItem(FILTER_STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.every(g => TYPE_GROUP_KEYS.includes(g))) return parsed;
      } catch {}
    }
    return [...TYPE_GROUP_KEYS];
  };

  const [weight, setWeight] = useState(getInitialWeight);
  const [selectedMedication, setSelectedMedication] = useState('');
  const [resultHistory, setResultHistory] = useState([]);
  const [typeFilters, setTypeFilters] = useState(getInitialFilters);
  const [copiedIndex, setCopiedIndex] = useState(null);

  // Persist weight across pages
  useEffect(() => {
    const v = parseFloat(weight);
    if (!isNaN(v) && v > 0) localStorage.setItem(WEIGHT_STORAGE_KEY, v);
  }, [weight]);

  useEffect(() => {
    localStorage.setItem(FILTER_STORAGE_KEY, JSON.stringify(typeFilters));
  }, [typeFilters]);

  const handleTypeFilterChange = (group) => {
    setTypeFilters(prev => {
      let next = prev.includes(group) ? prev.filter(g => g !== group) : [...prev, group];
      if (next.length === 0) return [...TYPE_GROUP_KEYS];
      return next;
    });
    setSelectedMedication('');
  };

  const selectedTypes = typeFilters.flatMap(group => TYPE_GROUPS[group]);
  const filteredOptions = medicationOptions.filter(opt => selectedTypes.includes(opt.type));

  const handleMedicationChange = (selectedOption) => {
    setSelectedMedication(selectedOption.value);
    const wt = parseFloat(weight);
    if (!isNaN(wt) && wt > 0) {
      const result = computeResult(selectedOption.value, weight);
      if (result) setResultHistory(prev => [result, ...prev]);
    }
  };

  const handleClearHistory = () => setResultHistory([]);

  const handleCopy = (result, index) => {
    const text = `${result.drugname} (wt ${result.weight} kg)\n${result.line1}`;

    navigator.clipboard.writeText(text).then(() => {
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 1500);
    });
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
            <label htmlFor="medication-select" className="calcplus-label">Select Medication</label>
            <Select
              inputId="medication-select"
              options={filteredOptions}
              value={filteredOptions.find(option => option.value === selectedMedication) || null}
              onChange={handleMedicationChange}
              placeholder="Select to calculate instantly"
              classNamePrefix="calcplus-select"
              isDisabled={filteredOptions.length === 0}
            />
          </div>
          <div className="calcplus-button-group">
            <button
              className="calcplus-btn"
              onClick={() => {
                const wt = parseFloat(weight);
                if (!selectedMedication) return;
                if (isNaN(wt) || wt <= 0) { alert("Please enter a valid weight (kg) before calculating."); return; }
                const result = computeResult(selectedMedication, weight);
                if (result) setResultHistory(prev => [result, ...prev]);
              }}
            >
              Calculate
            </button>
            <button className="calcplus-btn calcplus-btn-secondary" onClick={handleClearHistory}>Clear</button>
          </div>
          <div className="calcplus-filter-section">
            <label className="calcplus-label">Medication Type</label>
            <div className="calcplus-filter-chips">
              {TYPE_GROUP_KEYS.map(group => (
                <button
                  key={group}
                  type="button"
                  aria-pressed={typeFilters.includes(group)}
                  className={`calcplus-filter-chip${typeFilters.includes(group) ? ' calcplus-filter-chip-active' : ''}`}
                  onClick={() => handleTypeFilterChange(group)}
                >
                  {group}
                </button>
              ))}
            </div>
          </div>
          <div className="calcplus-affiliate-link">
            <a href="https://s.shopee.co.th/4LEsXaEIAX" target="_blank" rel="noopener noreferrer">
              📚 หนังสือคู่มือการใช้ยาในเด็ก
            </a>
          </div>
        </section>
        {resultHistory.length > 0 && (
          <section className="calcplus-section calcplus-results-section">
            <h2 className="calcplus-results-title">Dosages — tap card to copy</h2>
            <ol className="calcplus-results-list">
              {resultHistory.map((result, index) => (
                <li
                  key={index}
                  className="calcplus-result-card"
                  onClick={() => handleCopy(result, index)}
                  title="Tap to copy"
                >
                  <div className="calcplus-result-header">
                    <span className="calcplus-result-drug">{result.drugname}</span>
                    <span className={`calcplus-result-weight${copiedIndex === index ? ' copied' : ''}`}>
                      {copiedIndex === index ? '✓ Copied' : `wt ${result.weight} kg`}
                    </span>
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
