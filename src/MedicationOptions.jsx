// MedicationOptions.js

import React from 'react';
import Select from 'react-select';

 const medicationOptions = [
    { value: 'pcm120', label: 'Paracetamol 120mg/5ml', mkdose: 10, volume: 24, interval: 'every 4 - 6 hr', },
    { value: 'pcm160', label: 'Paracetamol 160mg/5ml', mkdose: 10,volume: 32, interval: 'every 4 - 6 hr', },
    { value: 'pcm240', label: 'Paracetamol 240mg/5ml', mkdose: 10,volume: 48, interval: 'every 4 - 6 hr', },
    // Add more medication options
  ];

 

export default MedicationOptions;
