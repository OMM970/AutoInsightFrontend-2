// Simulated deep-inspection data. In production this will be populated
// by a diagnostic/inspection service integration.
const defaultInspection = {
  overallScore: 82,
  engine: {
    rpmIdle: '780–820 RPM', coolantTemp: '88°C (normal)', misfireCount: 0,
    dtcCodes: 'None active', oilLeakage: 'Not detected', engineNoise: 'Normal',
  },
  brakes: {
    frontPadLife: '65%', rearPadLife: '58%', discCondition: 'Good', brakeFluid: 'Good — last changed 8 months ago',
  },
  tyres: {
    frontLeft: '70%', frontRight: '68%', rearLeft: '72%', rearRight: '70%',
  },
  battery: { health: '80%', voltage: '12.6V (healthy)' },
  suspension: { front: 'Good, no unusual play', rear: 'Good, no unusual play' },
  electrical: { lights: 'All functional', ac: 'Cooling normal', infotainment: 'Functional', sensors: 'All responding' },
};

const overrides = {
  c1: {
    overallScore: 61,
    engine: { rpmIdle: '800–850 RPM', coolantTemp: '91°C (slightly high)', misfireCount: 1, dtcCodes: 'P0300 (cleared, monitor)', oilLeakage: 'Minor seepage near valve cover', engineNoise: 'Slight tapping at idle' },
    brakes: { frontPadLife: '22%', rearPadLife: '18%', discCondition: 'Light scoring on front discs', brakeFluid: 'Due for change' },
    tyres: { frontLeft: '30%', frontRight: '28%', rearLeft: '40%', rearRight: '38%' },
    battery: { health: '58%', voltage: '12.1V (weak, monitor)' },
    suspension: { front: 'Minor bushing wear', rear: 'Good, no unusual play' },
    electrical: { lights: 'All functional', ac: 'Cooling slightly weak', infotainment: 'Functional', sensors: 'All responding' },
  },
  c8: {
    overallScore: 47,
    engine: { rpmIdle: '750–900 RPM (fluctuating)', coolantTemp: '94°C (high)', misfireCount: 3, dtcCodes: 'P0301, P0420', oilLeakage: 'Moderate leakage near oil pan', engineNoise: 'Noticeable knock under load' },
    brakes: { frontPadLife: '15%', rearPadLife: '20%', discCondition: 'Grooved, replacement advised', brakeFluid: 'Overdue' },
    tyres: { frontLeft: '20%', frontRight: '18%', rearLeft: '25%', rearRight: '22%' },
    battery: { health: '40%', voltage: '11.8V (weak)' },
    suspension: { front: 'Worn bushings, notable play', rear: 'Worn shock absorbers' },
    electrical: { lights: 'One tail light intermittent', ac: 'Weak cooling', infotainment: 'Occasional freeze', sensors: 'One sensor unresponsive' },
  },
  c6: {
    overallScore: 94,
    engine: { rpmIdle: 'N/A (EV)', coolantTemp: 'N/A', misfireCount: 0, dtcCodes: 'None active', oilLeakage: 'N/A', engineNoise: 'Silent — normal for EV' },
    battery: { health: '96%', voltage: '396V pack — healthy' },
  },
};

export function getInspection(carId) {
  const specific = overrides[carId] || {};
  return {
    ...defaultInspection,
    ...specific,
    engine: { ...defaultInspection.engine, ...(specific.engine || {}) },
    brakes: { ...defaultInspection.brakes, ...(specific.brakes || {}) },
    tyres: { ...defaultInspection.tyres, ...(specific.tyres || {}) },
    battery: { ...defaultInspection.battery, ...(specific.battery || {}) },
    suspension: { ...defaultInspection.suspension, ...(specific.suspension || {}) },
    electrical: { ...defaultInspection.electrical, ...(specific.electrical || {}) },
  };
}

export default overrides;
