// Simulated AI output. Shape mirrors what a future prediction service
// (POST /api/predictions/:carId) would return.
const defaultPrediction = {
  overallCondition: 84,
  risks: [
    { component: 'Engine', level: 'Low' },
    { component: 'Brakes', level: 'Medium' },
    { component: 'Tyres', level: 'Medium' },
    { component: 'Battery', level: 'Low' },
    { component: 'Suspension', level: 'Low' },
  ],
  insights: [
    'No major engine issue detected from the available inspection data.',
    'Brake pads are wearing at an expected rate for this mileage.',
    'Tyres show normal wear consistent with vehicle age.',
    'Battery health is within a healthy range for now.',
  ],
  timeline: [
    { month: 3, event: 'Routine service', cost: 4000 },
    { month: 8, event: 'Brake pad check', cost: 3000 },
    { month: 14, event: 'Tyre rotation / possible replacement', cost: 12000 },
    { month: 24, event: 'Major service', cost: 15000 },
    { month: 30, event: 'Battery check', cost: 5000 },
    { month: 36, event: 'Suspension inspection', cost: 6000 },
    { month: 48, event: 'Major service', cost: 18000 },
    { month: 54, event: 'Tyre replacement', cost: 24000 },
    { month: 60, event: 'Battery replacement', cost: 9000 },
  ],
  maintenanceByYear: { 1: 24000, 3: 150000, 5: 320000 },
};

const overrides = {
  c1: {
    overallCondition: 58,
    risks: [
      { component: 'Engine', level: 'Low' },
      { component: 'Brakes', level: 'High' },
      { component: 'Tyres', level: 'High' },
      { component: 'Battery', level: 'Medium' },
      { component: 'Suspension', level: 'Low' },
    ],
    insights: [
      'Brake pads may require replacement soon.',
      'Tyres show significant wear.',
      'Battery health indicates possible replacement within the forecast period.',
      'No major engine issue detected from the available inspection data.',
    ],
    timeline: [
      { month: 2, event: 'Brake pad replacement', cost: 8000 },
      { month: 3, event: 'Brake service', cost: 4000 },
      { month: 8, event: 'Tyre replacement', cost: 28000 },
      { month: 14, event: 'Battery replacement', cost: 9000 },
      { month: 24, event: 'Major service', cost: 16000 },
      { month: 30, event: 'Suspension bushing replacement', cost: 7000 },
      { month: 42, event: 'Tyre replacement (rear)', cost: 14000 },
      { month: 48, event: 'Major service', cost: 19000 },
    ],
    maintenanceByYear: { 1: 48000, 3: 150000, 5: 260000 },
  },
  c8: {
    overallCondition: 39,
    risks: [
      { component: 'Engine', level: 'High' },
      { component: 'Brakes', level: 'High' },
      { component: 'Tyres', level: 'High' },
      { component: 'Battery', level: 'High' },
      { component: 'Suspension', level: 'High' },
    ],
    insights: [
      'Engine shows signs of wear that may require attention soon.',
      'Brake components are near end of usable life.',
      'Tyres are significantly worn across all positions.',
      'Suspension components show notable play and may need replacement.',
    ],
    timeline: [
      { month: 1, event: 'Brake pad + disc replacement', cost: 14000 },
      { month: 2, event: 'Tyre replacement (all 4)', cost: 32000 },
      { month: 3, event: 'Battery replacement', cost: 9000 },
      { month: 6, event: 'Suspension overhaul', cost: 22000 },
      { month: 10, event: 'Engine diagnostic service', cost: 12000 },
      { month: 18, event: 'Major service', cost: 20000 },
      { month: 30, event: 'Major service', cost: 22000 },
    ],
    maintenanceByYear: { 1: 72000, 3: 210000, 5: 380000 },
  },
  c6: {
    overallCondition: 95,
    risks: [
      { component: 'Motor', level: 'Low' },
      { component: 'Brakes', level: 'Low' },
      { component: 'Tyres', level: 'Low' },
      { component: 'Battery Pack', level: 'Low' },
      { component: 'Suspension', level: 'Low' },
    ],
    insights: [
      'Battery pack health is excellent for the vehicle age.',
      'No major issues detected across any monitored system.',
      'Regenerative braking has kept pad wear minimal.',
      'Routine software and tyre checks are the only near-term needs.',
    ],
    timeline: [
      { month: 6, event: 'Software + safety check', cost: 2000 },
      { month: 12, event: 'Routine service', cost: 3000 },
      { month: 24, event: 'Tyre rotation', cost: 4000 },
      { month: 36, event: 'Brake fluid change', cost: 3000 },
      { month: 48, event: 'Routine service', cost: 4000 },
    ],
    maintenanceByYear: { 1: 15000, 3: 45000, 5: 90000 },
  },
};

export function getPrediction(carId) {
  return { ...defaultPrediction, ...(overrides[carId] || {}) };
}

export default overrides;
