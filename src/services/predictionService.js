import { getPrediction } from '../data/predictions';

const delay = (ms = 900) => new Promise((res) => setTimeout(res, ms));

// Simulates a call to an AI inference endpoint, e.g.
//   POST /api/predictions/:carId  -> { overallCondition, risks, insights, timeline }
export async function getAIPrediction(carId) {
  await delay();
  return getPrediction(carId);
}

export function getOwnershipCost(carId, years, purchasePrice) {
  const prediction = getPrediction(carId);
  const maintenance = prediction.maintenanceByYear[years] ?? prediction.maintenanceByYear[3];
  const monthsLimit = years * 12;
  const timeline = prediction.timeline.filter((t) => t.month <= monthsLimit);
  return {
    purchasePrice,
    expectedMaintenance: maintenance,
    expectedTotal: purchasePrice + maintenance,
    timeline,
  };
}
