import React, { useState } from 'react';
import Select from 'react-select';


const Calculator = () => {
  const [weight, setWeight] = useState(10); // Default weight value
  const [selectedMedication, setSelectedMedication] = useState('');
  const [resultHistory, setResultHistory] = useState([]);

  // ---------------medication database---------------
 
  const medicationOptions = [
       
    { value: 'abd200', label: 'Albendazole 200mg/5ml syr', mkdose: 0,volume: 0, interval: ' ',type:'syrbyage', ref:'pil',note:'> 2 y: 10 mL with meal single dose or BID 3 Days',warning:' - ',},
    { value: 'amx125', label: 'Amoxicillin 125mg/5ml syr', mindose: 6.6, maxdose: 13.3, mkdose: 13.3,volume: 25, interval: 'q8 hr or TID ', type:'syrrange',ref:'dpcKKU',warning:' max 2-3 g/day ',},
    { value: 'amx250', label: 'Amoxicillin 250mg/5ml syr', mindose: 6.6, maxdose: 13.3, mkdose: 13.3,volume: 50, interval: 'q8 hr or TID ', type:'syrrange',ref:'dpcKKU',warning:' max 2-3 g/day ',},
     { value: 'amx250bid', label: 'Amoxicillin 250mg/5ml syr BID', mkdose: 22.5,volume: 50, interval: 'q12 hr or BID ', type:'syr',ref:'mdx',warning:' max 2-3 g/day ',},
    { value: 'amx250c', label: 'Amoxicillin 250 mg cap', mindose: 6.6, maxdose: 13.3, mkdose: 13.3,volume: 250, interval: 'q8 hr or TID ', type:'tab',ref:'dpcKKU',warning:' max 2-3 g/day ',},
     { value: 'amx500c', label: 'Amoxicillin 500 mg cap', mindose: 6.6, maxdose: 13.3, mkdose: 13.3,volume: 500, interval: 'q8 hr or TID ', type:'tab',ref:'dpcKKU',warning:' max 2-3 g/day ',},
    { value: 'amx250h', label: 'Amoxicillin 250mg/5ml syr (high dose: max 2g/day)', mkdose: 45,volume: 50, interval: 'q12 hr or BID ', type:'syr',ref:'dpcKKU',warning:' max 2-3 g/day ',},
     { value: 'amxc228', label: 'Amox/clav 228.5 mg syr BID', mindose: 8.3, maxdose: 15, mkdose: 20,volume: 40, interval: 'q12 hr or BID ', type:'syrrange',ref:'mdx',warning:' - ',},
     { value: 'amxc457', label: 'Amox/clav 457 mg syr BID', mindose: 8.3, maxdose: 15, mkdose: 20,volume: 80, interval: 'q12 hr or BID ', type:'syrrange',ref:'mdx',warning:' - ',},
    { value: 'amxc600', label: 'Amox/clav 600 mg syr BID 10 day for AOM', mkdose: 45,volume: 111.4, interval: 'q12 hr or BID ', type:'syr',ref:'mdx',warning:' - ',},
    { value: 'atc1', label: 'Antacid susp (Alu/Mag/Simet)', mkdose: 4,volume: 4, interval: 'q3-6 hr or QID ', type:'syr',ref:'dpcKKU',warning:'max 30 mL/dose',},
    { value: 'abx30', label: 'Ambroxal 30mg/5ml syr', mkdose: 0,volume: 0, interval: ' ',type:'syrbyage', ref:'dpcKKU',note:'2-6 y: 2.5 mL TID \n6-12 y: 5 mL BID-TID \n>12 y: 5 mL TID or 10 mL BID',warning:' - ',},
    { value: 'azt200', label: 'Azithromycin 200mg/5ml syr for GAS infection', mkdose: 12,volume: 40, interval: 'OD 5 days ', type:'syr',ref:'dpcKKU',warning:' - ',},
    { value: 'bcp5', label: 'Hyoscine-N-ButylBr 5mg/5ml syr (Buscopan)', mkdose: 0.5,volume: 1, interval: 'q6-8 hr ', type:'syr',ref:'dpcKKU',warning:'max 40 mL/dose',},
    { value: 'bhx4', label: 'Bromhexine 4mg/5ml syr', mkdose: 0,volume: 0, interval: ' ',type:'syrbyage', ref:'dpcKKU',note:'2-6 y: 2.5 mL TID \n6-12 y: 5 mL TID \n>12 y: 10 mL TID',warning:' - ',},
    { value: 'bpngg2', label: 'Brompheniramine/GG 2/100 mg/5ml syr ', mkdose: 0.17,volume: 0.4, interval: 'TID-QID ', type:'syr',ref:'dpcKKU',warning:'<6 y: max 8 mg/day | >6 y: max 16 mg/day',},
    { value: 'cbc100', label: 'Carbocisteine 100mg/5ml syr', mkdose: 0,volume: 0, interval: ' ',type:'syrbyage', ref:'pil',note:'1-5 y: 5 mL OD - BID \n>5 y: 5 mL TID',warning:' - ',},
    { value: 'cbc250', label: 'Carbocisteine 250mg/5ml syr', mkdose: 0,volume: 0, interval: ' ',type:'syrbyage', ref:'pil',note:'2-5 y: 1.25 - 2.5 mL QID \n>5 y: 5 mL TID',warning:' - ',},
    { value: 'cdn125', label: 'Cefdinir 125mg/5ml syr ', mkdose: 7,volume: 25, interval: 'q12 hr or BID ', type:'syr',ref:'dpcKKU',warning:' max 600 mg/day ',},
    { value: 'cfx100', label: 'Cefixime 100mg/5ml syr', mkdose: 8,volume: 20, interval: 'OD ', type:'syr',ref:'dpcKKU',warning:' max 400 mg/day ',},
    { value: 'cpl125', label: 'Cephalexin 125mg/5ml syr', mindose: 8.3, maxdose: 16.6, mkdose: 12,volume: 25, interval: 'TID-QID ', type:'syrrange',ref:'dpcKKU',warning:' max 2-3 g/day ',},
    { value: 'cpl250', label: 'Cephalexin 250mg/5ml syr', mindose: 8.3, maxdose: 16.6, mkdose: 12,volume: 50, interval: 'TID-QID ', type:'syrrange',ref:'dpcKKU',warning:' max 2-3 g/day ',},
    { value: 'ctr5', label: 'Cetirizine 5mg/5ml syr', mkdose: 0,volume: 0, interval: ' ',type:'syrbyage', ref:'mdx',note:'2-6 y: 5 mL OD \n>6 y: 10 mL OD',warning:' 2-6 y max 5 mg/day ',},
     { value: 'cpm2', label: 'CPM 2mg/5ml syr', mkdose: 0.12,volume: 0.4, interval: 'TID - QID ',type:'syr', ref:'dpcKKU',warning:'2-6 y: max 6 mg/day | 6-12 y: max 12 mg/day | >12 y: max 24 mg/day',},
    { value: 'cxc125', label: 'Cloxacillin 125mg/5ml syr', mindose: 12.5, maxdose: 25, mkdose: 13.3,volume: 25, interval: 'q6 hr or QID AC ', type:'syrrange',ref:'dpcKKU',warning:'max 2 - 3 g/day',},
    { value: 'dcx625', label: 'Dicloxacillin 62.5mg/5ml syr', mindose: 6.25, maxdose: 12.5, mkdose: 13.3,volume: 12.5, interval: 'q6 hr or QID AC ', type:'syrrange',ref:'dpcKKU',warning:'max 100 mg/kg/day',},
    { value: 'dlr0.5', label: 'Desloratadine 0.5mg/ml syr', mkdose: 0,volume: 0, interval: ' ',type:'syrbyage', ref:'pil',note:'6 - 11 m: 2 mL OD \n1 - 5 y: 2.5 mL OD \n6 - 11 y: 5 mL OD \n>12 y: 10 mL OD',warning:' - ',},
    { value: 'dom1', label: 'Domperidone 1mg/ml syr', mindose: 0.2, maxdose: 0.4, mkdose: 0.3,volume: 1, interval: 'AC TID-QID ',type:'syrrange', ref:'dpcKKU',warning:' - ',},
    { value: 'fxf6', label: 'Fexofenadine 30mg/5ml syr', mkdose: 0,volume: 0, interval: ' ',type:'syrbyage', ref:'dpcKKU',note:'6 m -2 y: 2.5 mL BID \n2-11 y: 5 mL BID \n>12 y: 10 mL BID',warning:' - ',},
    { value: 'hdx10', label: 'Hydroxyzine (Atarax) 10mg/5ml syr', mkdose: 0.6,volume: 2, interval: 'q6 hr ',type:'syr', ref:'dpcKKU',warning:' - ',},
     { value: 'ibp100', label: 'Ibuprofen 100mg/5ml syr', mindose: 7, maxdose: 10, mkdose: 5,volume: 20, interval: 'PRN q6 - 8 hr ',type:'syrrange', ref:'dpcKKU, emc',warning:' - ',},
    { value: 'lrt5', label: 'Loratadine 5mg/5ml syr', mkdose: 0,volume: 0, interval: ' ',type:'syrbyage', ref:'mdx',note:'2-6 y: 5 mL OD \n>6 y: 10 mL OD',warning:' - ',},
     { value: 'mb100', label: 'Mebendazole 100mg/5ml syr', mkdose: 0,volume: 0, interval: ' ',type:'syrbyage', ref:'pil',note:'> 2 y: 5 mL with meal single dose \nor BID 3 Days',warning:' - ',},
    { value: 'pcm100', label: 'Paracetamol 100mg/ml syr', mindose: 10, maxdose: 15, mkdose: 10, volume: 100, interval: 'PRN q4 - 6 hr',type:'syrrange', ref:'mdx',warning:' max 4 g/day ',},
    { value: 'pcm120', label: 'Paracetamol 120mg/5ml syr', mindose: 10, maxdose: 15, mkdose: 10, volume: 24, interval: 'PRN q4 - 6 hr',type:'syrrange', ref:'mdx',warning:' max 4 g/day ',},
    { value: 'pcm160', label: 'Paracetamol 160mg/5ml syr', mindose: 10, maxdose: 15, mkdose: 10,volume: 32, interval: 'PRN q4 - 6 hr',type:'syrrange', ref:'mdx',warning:' max 4 g/day ',},
    { value: 'pcm240', label: 'Paracetamol 240mg/5ml syr', mindose: 10, maxdose: 15, mkdose: 10,volume: 48, interval: 'PRN q4 - 6 hr',type:'syrrange', ref:'mdx',warning:' max 4 g/day ',},
     { value: 'sbt2', label: 'Salbutamol 2mg/5ml syr ', mkdose: 0.1,volume: 0.4, interval: 'q6 hr ', type:'syr',ref:'dpcKKU',warning:'max 2 mg/dose ',},
    { value: 'smt40', label: 'Simethicone 40mg/0.6ml syr', mkdose: 0,volume: 0, interval: ' ',type:'syrbyage', ref:'dpcKKU',note:'<2 y: 0.3 mL PRN QID \n2-12 y: 0.6 mL PRN QID \n>12 y: 0.6 - 1.8 mL PRN QID',warning:' < 2 y max 240 mg/day ',},
     { value: 'smtdc55', label: 'Simethicone/Dicyclomine 50/5mg /5ml syr', mkdose: 0,volume: 0, interval: ' ',type:'syrbyage', ref:'dpcKKU',note:'<4 y: 2.5 mL TID - QID AC\n 4-12 y: 5 mL TID - QID AC ',warning:' - ',},
    { value: 'tbg13', label: 'Terbu/GG 0.3/13.3 mg/ml syr ',mindose: 0.07, maxdose: 0.1, mkdose: 0.1,volume: 0.3, interval: 'q6 hr ', type:'syrrange',ref:'dpcKKU',warning:'max 2.5 mg/dose ',},
     { value: 'tbt15', label: 'Terbutaline 1.5mg/5ml syr ',mindose: 0.07, maxdose: 0.1, mkdose: 0.1,volume: 0.3, interval: 'q6 hr ', type:'syrrange',ref:'dpcKKU',warning:'max 2.5 mg/dose ',},
    { value: 'tms40', label: 'Trimethoprim/sulfa (bactrim) 40/200 mg/5ml syr', mindose: 3, maxdose: 6, mkdose: 3,volume: 8, interval: 'q12 hr or BID ', type:'syrrange',ref:'dpcKKU',warning:'max 320 mg Trimethoprim/day ',},
    { value: 'pzqt', label: 'Praziquantel 600 mg tab for Tapeworms', mkdose: 10,volume: 600, interval: 'Single dose ', type:'tab',ref:'dpcKKU',warning:' - ',},
    { value: 'pzqc', label: 'Praziquantel 600 mg tab for Cysticercosis/Liver fluke', mkdose: 25,volume: 600, interval: 'TID 1 day (Liver fluke)\n 10 days (Cysticercosis) ', type:'tab',ref:'dpcKKU',warning:' - ',},
    { value: 'amxc1200', label: 'Amox/clav 1.2 g inj', mkdose: 45,volume: 12, interval: 'q12 hr', type:'inj',ref:'mdx',warning:' - ',},
    
  // ---------------medication database---------------
  ];
const handleClearHistory = () => {
    setResultHistory([]);
  };
  
  const handleCalculate = (selectedMedicationValue) => {
  const selectedMed = medicationOptions.find(option => option.value === selectedMedicationValue);
    
if (selectedMed) {
  let calculatedDose = null;
  let calculatedVolume = null;

  if (selectedMed.type === "syr") {
    // Calculation logic for syr type
    const dose = parseFloat(weight) * selectedMed.mkdose;
    calculatedDose = dose.toFixed(1) + " mg/dose (" +selectedMed.mkdose +" mg/kg/dose)";
    calculatedVolume = "Oral " + (dose / selectedMed.volume).toFixed(1) + " mL " + selectedMed.interval;
      } else if (selectedMed.type === "syrrange") {
    // Calculation logic for syr show  range dose
    const mindose = parseFloat(weight) * selectedMed.mindose;
    const maxdose = parseFloat(weight) * selectedMed.maxdose;
    calculatedDose = mindose.toFixed(1)+ " - " +  maxdose.toFixed(1) +" mg/dose (" +selectedMed.mindose + " - " + selectedMed.maxdose + " mg/kg/dose)";
    calculatedVolume = "Oral " + (mindose / selectedMed.volume).toFixed(1) + " - " + (maxdose / selectedMed.volume).toFixed(1) + " mL " + selectedMed.interval;
  }   else if (selectedMed.type === "syrbyage") {
    // Calculation logic for syr by age type
    calculatedDose = "Dose by age";
    calculatedVolume = selectedMed.note;
  }   else if (selectedMed.type === "tab") {
    // Calculation logic for tablet type
    const dose = parseFloat(weight) * selectedMed.mkdose;
    calculatedDose = dose.toFixed(0) + " mg/dose (" +selectedMed.mkdose +" mg/kg/dose)";
    calculatedVolume = "Oral " + (dose / selectedMed.volume).toFixed(1) + " cap/tab  "+ selectedMed.interval;
  }   else if (selectedMed.type === "inj") {
    // Calculation logic for injection type
    const dose = parseFloat(weight) * selectedMed.mkdose;
    calculatedDose = dose.toFixed(0) + " mg/dose (" +selectedMed.mkdose +" mg/kg/dose)";
    calculatedVolume = "IV " + dose.toFixed(1) + " mg "+ selectedMed.interval;
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
      <h2 className ="title">👶Pediatric Dose Calculator</h2>
      <label>
        <p>Infant/Child Weight:</p>
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
    onChange={selectedOption => {
      setSelectedMedication(selectedOption.value);
      handleCalculate(selectedOption.value); // Call handleCalculate when medication is selected
    }}
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
                <div className="dose" dangerouslySetInnerHTML={{ __html: result.line1.replace(/\n/g, '<br>') }} />
                <p className="note">📄 {result.line2}  | ref: {result.ref}</p>
                <p className="warning">⚠️ {result.warning}  </p>
              </li>
            ))}
          </ol>
        </div>
      )}
      <footer className="footer">
        <p> <a href="https://kmpnote.notion.site/Reference-76efcd3eb74e46cabfb01cdd75a3207b?pvs=4">Reference</a> | <a href="https://www.facebook.com/KeepMovingPharmacist/posts/pfbid0JAKtnAVq9VeqQLAgLKPsE3eHG3yt58vei8H9fUTRu57xHLD5dTvkCWPUUbauArbZl">Bug report/Suggestion</a> | <a href="https://kmpnote.notion.site/Changelog-abfa6b64e2aa411b8e68874ff0bb38f6?pvs=4">Changelog</a> | <a href="https://www.facebook.com/KeepMovingPharmacist">KMP </a>
        </p>
        <p> Disclaimer: Calculations must be re-checked. The shown results can be different from the calculated results because of rounding.</p>
        </footer>
    </div>
  );
};

export default Calculator;