import React, { useState, useEffect, useRef } from 'react';
import medicationOptions from './Medicationplus';

const TYPE_GROUPS = {
  Syrup: ["syr", "syrrange", "syrbyage", "favi", "sac"],
  Tablet: ["tab", "tabrange"],
  Injection: ["inj", "injrange"],
};
const TYPE_GROUP_KEYS = Object.keys(TYPE_GROUPS);
const FILTER_STORAGE_KEY = 'calcpack_typeFilters';
const MEDICATIONS_STORAGE_KEY = 'calcpack_selectedMedications';
const WEIGHT_STORAGE_KEY = 'calcpack_weight';

const getDeviceColumns = () => {
  if (window.innerWidth < 600) return 1; // mobile
  if (window.innerWidth < 1024) return 2; // tablet
  return 3; // desktop
};

const DrugsetCalculator = () => {
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

  // Load selected medications from localStorage
  const getInitialMedications = () => {
    const saved = localStorage.getItem(MEDICATIONS_STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return parsed;
        }
      } catch {}
    }
    return [];
  };

  // Load weight from localStorage
  const getInitialWeight = () => {
    const saved = localStorage.getItem(WEIGHT_STORAGE_KEY);
    if (saved) {
      try {
        const weight = parseFloat(saved);
        if (!isNaN(weight) && weight > 0) {
          return weight.toString();
        }
      } catch {}
    }
    return '10';
  };

  const [weight, setWeight] = useState(getInitialWeight);
  const [selectedMedications, setSelectedMedications] = useState(getInitialMedications);
  const [results, setResults] = useState([]);
  const [typeFilters, setTypeFilters] = useState(getInitialFilters);
  const [columnLayout, setColumnLayout] = useState(getDeviceColumns());

  // Responsive column layout based on device width
  useEffect(() => {
    const handleResize = () => {
      setColumnLayout(getDeviceColumns());
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Save filter state to localStorage on change
  useEffect(() => {
    localStorage.setItem(FILTER_STORAGE_KEY, JSON.stringify(typeFilters));
  }, [typeFilters]);

  // Save selected medications to localStorage on change
  useEffect(() => {
    localStorage.setItem(MEDICATIONS_STORAGE_KEY, JSON.stringify(selectedMedications));
  }, [selectedMedications]);

  // Save weight to localStorage on change
  useEffect(() => {
    localStorage.setItem(WEIGHT_STORAGE_KEY, weight);
  }, [weight]);

  const handleTypeFilterChange = (group) => {
    setTypeFilters(prev => {
      let next;
      if (prev.includes(group)) {
        next = prev.filter(g => g !== group);
      } else {
        next = [...prev, group];
      }
      // Prevent all unchecked: if none checked, keep all checked
      if (next.length === 0) next = [...TYPE_GROUP_KEYS];
      
      // Filter out selected medications that are no longer available after filter change
      setSelectedMedications(prevMeds => {
        const availableTypes = next.flatMap(g => TYPE_GROUPS[g]);
        return prevMeds.filter(medName => {
          const med = medicationOptions.find(option => option.label === medName);
          return med && availableTypes.includes(med.type);
        });
      });
      
      return next;
    });
  };

  // Get all types from checked groups
  const selectedTypes = typeFilters.length === 0
    ? null
    : typeFilters.flatMap(group => TYPE_GROUPS[group]);

  const filteredOptions = !selectedTypes
    ? medicationOptions
    : medicationOptions.filter(opt => selectedTypes.includes(opt.type));

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

  const clearAllData = () => {
    // Clear localStorage
    localStorage.removeItem(FILTER_STORAGE_KEY);
    localStorage.removeItem(MEDICATIONS_STORAGE_KEY);
    localStorage.removeItem(WEIGHT_STORAGE_KEY);
    
    // Reset state
    setTypeFilters([...TYPE_GROUP_KEYS]);
    setSelectedMedications([]);
    setWeight('10');
    setResults([]);
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

  return (
    <div className="calcplus-app-bg">
      <header className="calcplus-header">
        <h1 className="calcplus-title">Peddose Package</h1>
        <p className="calcplus-subtitle">Multi-Drug Calculator</p>
      </header>
      <main className="calcplus-main">
        <section className="calcplus-section calcplus-input-section">
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
            <label htmlFor="medication-select" className="calcplus-label">Select Medications</label>
            <select
              id="medication-select"
              multiple
              value={selectedMedications}
              onChange={handleMedicationChange}
              className="calcplus-input"
              style={{ minHeight: '100px' }}
            >
              {filteredOptions.map((medication) => (
                <option key={medication.label} value={medication.label}>
                  {medication.label}
                </option>
              ))}
            </select>
          </div>
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
            <button className="calcplus-btn calcplus-btn-secondary" onClick={clearAllData}>Clear All</button>
          </div>
        </section>
        {results.length > 0 && (
          <section className="calcplus-section calcplus-results-section">
            <h2 className="calcplus-results-title">Dosages</h2>
            <div className="calcplus-results-grid">
              {results.map((result, index) => (
                <div key={index} className="calcplus-result-card">
                  <div className="calcplus-result-header">
                    <span className="calcplus-result-drug">{result.drugName}</span>
                  </div>
                  <div className="calcplus-result-dose">{result.line2}</div>
                  <div className="calcplus-result-note">{result.line1}</div>
                  {result.warning && result.warning.trim() !== '' && (
                    <div className="calcplus-result-warning">⚠️ {result.warning}</div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default DrugsetCalculator;