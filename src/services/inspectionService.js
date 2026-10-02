import { getInspection } from '../data/inspectionData';

const delay = (ms = 400) => new Promise((res) => setTimeout(res, ms));

export async function getInspectionReport(carId) {
  await delay();
  return getInspection(carId);
}
