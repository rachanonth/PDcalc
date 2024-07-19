// ---------------medication database---------------

const medicationOptions = [

  { value: 'abd200', label: 'Albendazole 200mg/5ml syr', mkdose: 0, volume: 0, interval: ' ', type: 'syrbyage', ref: 'pil', note: '> 2 y: 10 mL with meal single dose or BID 3 Days', warning: ' - ', },
  { value: 'amkiv', label: '💉Amikacin inj', mindose: 15, maxdose: 20, mkdose: 0, volume: 0, interval: 'OD', type: 'injrange', ref: 'mdx', warning: ' max 1.5 g/day ', },
  { value: 'amx125', label: 'Amoxicillin 125mg/5ml syr', mindose: 6.6, maxdose: 13.3, mkdose: 13.3, volume: 25, interval: 'q8 hr or TID ', type: 'syrrange', ref: 'dpcKKU', warning: ' max 2-3 g/day ', },
  { value: 'amx250', label: 'Amoxicillin 250mg/5ml syr', mindose: 6.6, maxdose: 13.3, mkdose: 13.3, volume: 50, interval: 'q8 hr or TID ', type: 'syrrange', ref: 'dpcKKU', warning: ' max 2-3 g/day ', },
  { value: 'amx250bid', label: 'Amoxicillin 250mg/5ml syr BID', mkdose: 22.5, volume: 50, interval: 'q12 hr or BID ', type: 'syr', ref: 'mdx', warning: ' max 2-3 g/day ', },
  { value: 'amx250c', label: 'Amoxicillin 250 mg cap', mindose: 6.6, maxdose: 13.3, mkdose: 13.3, volume: 250, interval: 'q8 hr or TID ', type: 'tabrange', ref: 'dpcKKU', warning: ' max 2-3 g/day ', },
  { value: 'amx500c', label: 'Amoxicillin 500 mg cap', mindose: 6.6, maxdose: 13.3, mkdose: 13.3, volume: 500, interval: 'q8 hr or TID ', type: 'tabrange', ref: 'dpcKKU', warning: ' max 2-3 g/day ', },
  { value: 'amx500cbid', label: 'Amoxicillin 500 mg cap BID', mindose: 10, maxdose: 20, mkdose: 20, volume: 500, interval: 'q12 hr or BID ', type: 'tabrange', ref: 'dpcKKU', warning: ' max 2-3 g/day ', },
  { value: 'amx250h', label: 'Amoxicillin 250mg/5ml syr (high dose)', mkdose: 45, volume: 50, interval: 'q12 hr or BID ', type: 'syr', ref: 'dpcKKU', warning: ' max 2-3 g/day ', },
  { value: 'amx500h', label: 'Amoxicillin 500 mg cap (high dose)', mkdose: 45, volume: 500, interval: 'q12 hr or BID ', type: 'tab', ref: 'dpcKKU', warning: ' max 2-3 g/day ', },
  { value: 'amxc228', label: 'Amox/clav 228.5 mg syr BID', mindose: 8.3, maxdose: 15, mkdose: 20, volume: 40, interval: 'q12 hr or BID ', type: 'syrrange', ref: 'mdx', warning: ' - ', },
  { value: 'amxc457', label: 'Amox/clav 457 mg syr BID', mindose: 8.3, maxdose: 15, mkdose: 20, volume: 80, interval: 'q12 hr or BID ', type: 'syrrange', ref: 'mdx', warning: ' - ', },
  { value: 'amxc600', label: 'Amox/clav 600 mg syr BID 10 day for AOM', mkdose: 45, volume: 111.4, interval: 'q12 hr or BID ', type: 'syr', ref: 'mdx', warning: ' - ', },
  { value: 'amxc625', label: 'Amox/clav 625 mg tab BID', mindose: 8.3, maxdose: 15, mkdose: 20, volume: 500, interval: 'q12 hr or BID ', type: 'tabrange', ref: 'mdx', warning: ' - ', },
  { value: 'amxciv', label: '💉Amox/clav inj', mkdose: 45, volume: 0, interval: 'q12 hr', type: 'inj', ref: 'mdx', warning: ' - ', },
  { value: 'apciv', label: '💉Ampicillin inj', mindose: 25, maxdose: 50, mkdose: 0, volume: 0, interval: 'q6 hr', type: 'injrange', ref: 'mdx', warning: ' max 2 g/dose ', },
  { value: 'atc1', label: 'Antacid susp (Alu/Mag/Simet)', mkdose: 4, volume: 4, interval: 'q3-6 hr or QID ', type: 'syr', ref: 'dpcKKU', warning: 'max 30 mL/dose', },
  { value: 'abx30', label: 'Ambroxal 30mg/5ml syr', mkdose: 0, volume: 0, interval: ' ', type: 'syrbyage', ref: 'dpcKKU', note: '2-6 y: 2.5 mL TID \n6-12 y: 5 mL BID-TID \n>12 y: 5 mL TID or 10 mL BID', warning: ' - ', },
  { value: 'azt200', label: 'Azithromycin 200mg/5ml syr for GAS infection', mkdose: 12, volume: 40, interval: 'OD 5 days ', type: 'syr', ref: 'dpcKKU', warning: ' - ', },
  { value: 'bcp5', label: 'Hyoscine-N-ButylBr 5mg/5ml syr (Buscopan)', mkdose: 0.5, volume: 1, interval: 'q6-8 hr ', type: 'syr', ref: 'dpcKKU', warning: 'max 40 mg/dose', },
  { value: 'bcp10', label: 'Hyoscine-N-ButylBr 10 mg tab (Buscopan)', mkdose: 0.5, volume: 10, interval: 'q6-8 hr ', type: 'tab', ref: 'dpcKKU', warning: 'max 40 mg/dose', },
  { value: 'bhx4', label: 'Bromhexine 4mg/5ml syr', mkdose: 0, volume: 0, interval: ' ', type: 'syrbyage', ref: 'dpcKKU', note: '2-6 y: 2.5 mL TID \n6-12 y: 5 mL TID \n>12 y: 10 mL TID', warning: ' - ', },
  { value: 'bpngg2', label: 'Brompheniramine/GG 2/100 mg/5ml syr ', mkdose: 0.17, volume: 0.4, interval: 'TID-QID ', type: 'syr', ref: 'dpcKKU', warning: '<6 y: max 8 mg/day | >6 y: max 16 mg/day', },
  { value: 'cbc100', label: 'Carbocisteine 100mg/5ml syr', mkdose: 0, volume: 0, interval: ' ', type: 'syrbyage', ref: 'pil', note: '1-5 y: 5 mL OD - BID \n>5 y: 5 mL TID', warning: ' - ', },
  { value: 'cbc200', label: 'Carbocisteine 200mg/5ml syr', mkdose: 0, volume: 0, interval: ' ', type: 'syrbyage', ref: 'pil', note: '2-5 y: 2.5 mL TID - QID \n>5 y: 5 mL TID', warning: ' - ', },
  { value: 'cbc250', label: 'Carbocisteine 250mg/5ml syr', mkdose: 0, volume: 0, interval: ' ', type: 'syrbyage', ref: 'pil', note: '2-5 y: 1.25 - 2.5 mL QID \n>5 y: 5 mL TID', warning: ' - ', },
  { value: 'cbc500', label: 'Carbocisteine 500mg/5ml syr', mkdose: 0, volume: 0, interval: ' ', type: 'syrbyage', ref: 'pil', note: '2-5 y: 0.625 - 1.25 mL QID \n>5 y: 2.5 mL TID', warning: ' - ', },
  { value: 'cdmiv', label: '💉Clindamycin inj ', mindose: 6.6, maxdose: 13.3, mkdose: 0, volume: 0, interval: 'q8 hr', type: 'injrange', ref: 'mdx', warning: ' max 2.7g/day ', },
  { value: 'cdn125', label: 'Cefdinir 125mg/5ml syr ', mkdose: 7, volume: 25, interval: 'q12 hr or BID ', type: 'syr', ref: 'dpcKKU', warning: ' max 600 mg/day ', },
  { value: 'cfpiv', label: '💉Cefepime inj ', mindose: 25, maxdose: 50, mkdose: 50, volume: 0, interval: 'q8 hr', type: 'inj', ref: 'mdx', warning: ' max 2g/dose ', },
  { value: 'cftiv', label: '💉Cefotaxime inj ', mindose: 25, maxdose: 50, mkdose: 0, volume: 0, interval: 'q6 hr', type: 'injrange', ref: 'mdx', warning: ' max 2g/dose ', },
  { value: 'cftivhigh', label: '💉Cefotaxime inj - Meningitis ', mindose: 50, maxdose: 75, mkdose: 0, volume: 0, interval: 'q6 hr', type: 'injrange', ref: 'mdx', warning: ' max 12g/day ', },
  { value: 'cfx100', label: 'Cefixime 100mg/5ml syr', mkdose: 8, volume: 20, interval: 'OD ', type: 'syr', ref: 'dpcKKU', warning: ' max 400 mg/day ', },
  { value: 'cfzivq6', label: '💉CeFAZolin inj q6 hr', mindose: 12.5, maxdose: 25, mkdose: 25, volume: 0, interval: 'q6 hr', type: 'injrange', ref: 'mdx', warning: ' max 2g/dose ', },
  { value: 'cfzivq8', label: '💉CeFAZolin inj q8 hr', mindose: 16.6, maxdose: 33.3, mkdose: 25, volume: 0, interval: 'q8 hr', type: 'injrange', ref: 'mdx', warning: ' max 2g/dose ', },
  { value: 'cpl125', label: 'Cephalexin 125mg/5ml syr', mindose: 8.3, maxdose: 16.6, mkdose: 12, volume: 25, interval: 'TID-QID ', type: 'syrrange', ref: 'dpcKKU', warning: ' max 2-3 g/day ', },
  { value: 'cpl250', label: 'Cephalexin 250mg/5ml syr', mindose: 8.3, maxdose: 16.6, mkdose: 12, volume: 50, interval: 'TID-QID ', type: 'syrrange', ref: 'dpcKKU', warning: ' max 2-3 g/day ', },
  { value: 'ctaiv', label: '💉cefTRIAXone inj ', mindose: 50, maxdose: 75, mkdose: 25, volume: 0, interval: 'OD', type: 'injrange', ref: 'mdx', warning: ' max 2g/dose | OD or divided q12 hr ', },
  { value: 'ctaivhigh', label: '💉cefTRIAXone inj - Bacterial Meningitis ', mindose: 80, maxdose: 100, mkdose: 0, volume: 0, interval: 'OD', type: 'injrange', ref: 'mdx', warning: ' max 4g/dose | OD or divided q12 hr ', },
  { value: 'ctziv', label: '💉CefTAZidime inj ', mindose: 33.3, maxdose: 50, mkdose: 0, volume: 0, interval: 'q8 hr', type: 'injrange', ref: 'mdx', warning: ' max 2g/dose ', },
  { value: 'ctr5', label: 'Cetirizine 5mg/5ml syr', mkdose: 0, volume: 0, interval: ' ', type: 'syrbyage', ref: 'mdx', note: '2-6 y: 5 mL OD \n>6 y: 10 mL OD', warning: ' 2-6 y max 5 mg/day ', },
  { value: 'cpm2', label: 'CPM 2mg/5ml syr', mkdose: 0.12, volume: 0.4, interval: 'TID - QID ', type: 'syr', ref: 'dpcKKU', warning: '2-6 y: max 6 mg/day | 6-12 y: max 12 mg/day | >12 y: max 24 mg/day', },
  { value: 'cxc125', label: 'Cloxacillin 125mg/5ml syr', mindose: 12.5, maxdose: 25, mkdose: 13.3, volume: 25, interval: 'q6 hr or QID AC ', type: 'syrrange', ref: 'dpcKKU', warning: 'max 2 - 3 g/day', },
  { value: 'dcx625', label: 'Dicloxacillin 62.5mg/5ml syr', mindose: 6.25, maxdose: 12.5, mkdose: 13.3, volume: 12.5, interval: 'q6 hr or QID AC ', type: 'syrrange', ref: 'dpcKKU', warning: 'max 100 mg/kg/day', },
  { value: 'dlr0.5', label: 'Desloratadine 0.5mg/ml syr', mkdose: 0, volume: 0, interval: ' ', type: 'syrbyage', ref: 'pil', note: '6 - 11 m: 2 mL OD \n1 - 5 y: 2.5 mL OD \n6 - 11 y: 5 mL OD \n>12 y: 10 mL OD', warning: ' - ', },
  { value: 'dom1', label: 'Domperidone 1mg/ml syr', mindose: 0.2, maxdose: 0.4, mkdose: 0.3, volume: 1, interval: 'AC TID-QID ', type: 'syrrange', ref: 'dpcKKU', warning: ' - ', },
  { value: 'dom10', label: 'Domperidone 10 mg tab', mindose: 0.2, maxdose: 0.4, mkdose: 0.3, volume: 10, interval: 'AC TID-QID ', type: 'tabrange', ref: 'dpcKKU', warning: ' - ', },
  { value: 'dph50', label: 'Diphenhydramine 50 mg tab', mindose: 0.2, maxdose: 0.4, mkdose: 1.25, volume: 50, interval: 'QID ', type: 'tab', ref: 'dpcKKU', warning: ' 25 - 50 mg/dose at bedtime for sleep induction ', },
  { value: 'fvp', label: 'Favipiravir for seasonal influenza', type: 'favi', ref: 'DMS', warning: ' - ', },
  { value: 'fxf6', label: 'Fexofenadine 30mg/5ml syr', mkdose: 0, volume: 0, interval: ' ', type: 'syrbyage', ref: 'dpcKKU', note: '6 m -2 y: 2.5 mL BID \n2-11 y: 5 mL BID \n>12 y: 10 mL BID', warning: ' - ', },
  { value: 'gg2', label: 'Guaifenesin 100mg/5ml syr (< 2 y)', mindose: 2.5, maxdose: 5, mkdose: 0, volume: 20, interval: 'QID ', type: 'syrrange', ref: 'dpcKKU', warning: '-', },
  { value: 'gg100', label: 'Guaifenesin 100mg/5ml syr', mkdose: 0, volume: 0, interval: ' ', type: 'syrbyage', ref: 'dpcKKU', note: '2 - 6 y: 2.5 mL QID \n6-12 y: 5 mL QID \n>12 y: 10 mL QID', warning: ' - ', },
  { value: 'gtmiv', label: '💉Gentamicin inj', mindose: 5, maxdose: 7.5, mkdose: 0, volume: 0, interval: 'OD', type: 'injrange', ref: 'mdx', warning: ' - ', },
  { value: 'hdx10', label: 'Hydroxyzine (Atarax) 10mg/5ml syr', mkdose: 0.6, volume: 2, interval: 'q6 hr ', type: 'syr', ref: 'dpcKKU', warning: ' - ', },
  { value: 'ibp100', label: 'Ibuprofen 100mg/5ml syr', mindose: 7, maxdose: 10, mkdose: 5, volume: 20, interval: 'PRN q6 - 8 hr ', type: 'syrrange', ref: 'dpcKKU, emc', warning: ' - ', },
  { value: 'ibp200', label: 'Ibuprofen 200mg tab', mindose: 7, maxdose: 10, mkdose: 5, volume: 200, interval: 'PRN q6 - 8 hr ', type: 'tabrange', ref: 'dpcKKU, emc', warning: ' - ', },
  { value: 'impiv', label: '💉Imipenem/Cilastatin inj ', mindose: 15, maxdose: 25, mkdose: 0, volume: 0, interval: 'q6 hr', type: 'injrange', ref: 'mdx', warning: ' max 4g/day  ', },
  { value: 'lrt5', label: 'Loratadine 5mg/5ml syr', mkdose: 0, volume: 0, interval: ' ', type: 'syrbyage', ref: 'mdx', note: '2-6 y: 5 mL OD \n>6 y: 10 mL OD', warning: ' - ', },
  { value: 'lvd', label: 'Levodropropizine 0.6mg/ml syr', mkdose: 1, volume: 6, interval: 'TID at intervals of at least 6 hours ', type: 'syr', ref: 'MIMS', note: '-', warning: ' Max: 3 mg/kg/day ', },
  { value: 'mb100', label: 'Mebendazole 100mg/5ml syr', mkdose: 0, volume: 0, interval: ' ', type: 'syrbyage', ref: 'pil', note: '> 2 y: 5 mL with meal single dose \nor BID 3 Days', warning: ' - ', },
  { value: 'mrpiv', label: '💉Meropenem inj ', mindose: 10, maxdose: 40, mkdose: 0, volume: 0, interval: 'q8 hr', type: 'injrange', ref: 'mdx', warning: ' max 0.5g/dose (10mkdose) | 1g/dose (20mkdose) | 2g/dose (40mkdose)  ', },
  { value: 'mtn400', label: 'MetroNIDAZOLE 400 mg Tab ', mindose: 10, maxdose: 13, mkdose: 0, volume: 400, interval: 'q8 hr', type: 'tabrange', ref: 'dpcKKU', warning: ' max 500mg/dose ', },
  { value: 'mtniv', label: '💉MetroNIDAZOLE inj ', mindose: 7.5, maxdose: 10, mkdose: 0, volume: 0, interval: 'q8 hr', type: 'injrange', ref: 'mdx', warning: ' max 500mg/dose ', },
  { value: 'ompz20', label: 'Omeprazole 20 mg cap', mindose: 0.2, maxdose: 3.5, mkdose: 0, volume: 20, interval: 'AC OD', type: 'tabrange', ref: 'dpcKKU', warning: ' max 40 mg/day ', },
  { value: 'pcm100', label: 'Paracetamol 100mg/ml syr', mindose: 10, maxdose: 15, mkdose: 10, volume: 100, interval: 'PRN q4 - 6 hr', type: 'syrrange', ref: 'mdx', warning: ' max 4 g/day ', },
  { value: 'pcm120', label: 'Paracetamol 120mg/5ml syr', mindose: 10, maxdose: 15, mkdose: 10, volume: 24, interval: 'PRN q4 - 6 hr', type: 'syrrange', ref: 'mdx', warning: ' max 4 g/day ', },
  { value: 'pcm160', label: 'Paracetamol 160mg/5ml syr', mindose: 10, maxdose: 15, mkdose: 10, volume: 32, interval: 'PRN q4 - 6 hr', type: 'syrrange', ref: 'mdx', warning: ' max 4 g/day ', },
  { value: 'pcm240', label: 'Paracetamol 250mg/5ml syr', mindose: 10, maxdose: 15, mkdose: 10, volume: 50, interval: 'PRN q4 - 6 hr', type: 'syrrange', ref: 'mdx', warning: ' max 4 g/day ', },
  { value: 'pcm325', label: 'Paracetamol 325 mg tab', mindose: 10, maxdose: 15, mkdose: 10, volume: 325, interval: 'PRN q4 - 6 hr', type: 'tabrange', ref: 'mdx', warning: ' max 4 g/day ', },
  { value: 'pcm500', label: 'Paracetamol 500 mg tab', mindose: 10, maxdose: 15, mkdose: 10, volume: 500, interval: 'PRN q4 - 6 hr', type: 'tabrange', ref: 'mdx', warning: ' max 4 g/day ', },
  { value: 'pptziv', label: '💉Pip/Tazo inj (based on piperacillin component) ', mindose: 66.6, maxdose: 100, mkdose: 0, volume: 0, interval: 'q8 hr', type: 'injrange', ref: 'mdx', warning: ' - ', },
  { value: 'pde', label: 'Pseudoephedrine 30mg/5ml syr', mkdose: 1, volume: 6, interval: 'TID - QID ', type: 'syr', ref: 'dpcKKU', note: '-', warning: ' Max: 120 mg/day ', },
  { value: 'rcc', label: 'Racecadotril (Hidrasec 10 mg Sac)', mkdose: 1.5, volume: 10, interval: 'TID ', type: 'sac', ref: 'MIMS', warning: 'Treatment should not exceed 7 days', },
  { value: 'sbt2', label: 'Salbutamol 2mg/5ml syr ', mkdose: 0.1, volume: 0.4, interval: 'q6 hr ', type: 'syr', ref: 'dpcKKU', warning: 'max 2 mg/dose ', },
  { value: 'smt3', label: 'Dioctahedral smectite (Smecta) powder 3 g', mkdose: 0, volume: 0, interval: ' ', type: 'syrbyage', ref: 'dpcKKU', note: '<=1 y: 2 sachets a day for 3 days then 1 sachet a day \n>1 y: 4 sachets a day for 3 days then 2 sachets a day', warning: ' - ', },
  { value: 'smt40', label: 'Simethicone 40mg/0.6ml syr', mkdose: 0, volume: 0, interval: ' ', type: 'syrbyage', ref: 'dpcKKU', note: '<2 y: 0.3 mL PRN QID \n2-12 y: 0.6 mL PRN QID \n>12 y: 0.6 - 1.8 mL PRN QID', warning: ' < 2 y max 240 mg/day ', },
  { value: 'smtdc55', label: 'Simethicone/Dicyclomine 50/5mg /5ml syr', mkdose: 0, volume: 0, interval: ' ', type: 'syrbyage', ref: 'dpcKKU', note: '<4 y: 2.5 mL TID - QID AC\n 4-12 y: 5 mL TID - QID AC ', warning: ' - ', },
  { value: 'tbg13', label: 'Terbu/GG 0.3/13.3 mg/ml syr ', mindose: 0.07, maxdose: 0.1, mkdose: 0.1, volume: 0.3, interval: 'q6 hr ', type: 'syrrange', ref: 'dpcKKU', warning: 'max 2.5 mg/dose ', },
  { value: 'tbt15', label: 'Terbutaline 1.5mg/5ml syr ', mindose: 0.07, maxdose: 0.1, mkdose: 0.1, volume: 0.3, interval: 'q6 hr ', type: 'syrrange', ref: 'dpcKKU', warning: 'max 2.5 mg/dose ', },
  { value: 'tms40', label: 'Trimethoprim/sulfa (bactrim) 40/200 mg/5ml syr', mindose: 3, maxdose: 6, mkdose: 3, volume: 8, interval: 'q12 hr or BID ', type: 'syrrange', ref: 'dpcKKU', warning: 'max 320 mg Trimethoprim/day ', },
  { value: 'tmsfiv', label: '💉Trimethoprim/sulfa (bactrim) inj (based on trimethoprim component) ', mindose: 4, maxdose: 6, mkdose: 0, volume: 0, interval: 'q12 hr', type: 'injrange', ref: 'mdx', warning: ' max trimethoprim 320 mg/day , sulfamethoxazole 1600 mg/day ', },
  { value: 'pzqt', label: 'Praziquantel 600 mg tab for Tapeworms', mkdose: 10, volume: 600, interval: 'Single dose ', type: 'tab', ref: 'dpcKKU', warning: ' - ', },
  { value: 'pzqc', label: 'Praziquantel 600 mg tab for Cysticercosis/Liver fluke', mkdose: 25, volume: 600, interval: 'TID 1 day (Liver fluke)\n 10 days (Cysticercosis) ', type: 'tab', ref: 'dpcKKU', warning: ' - ', },


  // ---------------medication database---------------
];
export default medicationOptions;