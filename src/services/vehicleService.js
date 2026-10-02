// Service layer for vehicle/car data. Swap the body of each function for
// a fetch() call to the real backend when it's ready.

const delay = (ms = 150) => new Promise((res) => setTimeout(res, ms));

export async function getCarsByDealer(dealerId) {
  const response = await fetch(
      `http://localhost:8083/api/v1/inventory/dealer/${dealerId}`
  );

  if (!response.ok) {
    throw new Error('Failed to fetch dealer inventory');
  }

  return response.json();
}

export async function getCarById(inventoryId) {
  const response = await fetch(
      `http://localhost:8083/api/v1/inventory/${inventoryId}`
  );

  if (!response.ok) {
    if (response.status === 404) {
      return null;
    }

    throw new Error('Failed to fetch inventory');
  }

  return response.json();
}
export async function getAllCars() {
  await delay();
  return cars;
}

export function filterCars(carList, filters) {
  const {
    priceMin, priceMax, brands = [], yearMin, yearMax, fuels = [],
    transmissions = [], mileageBuckets = [], owners = [], conditions = [],
    maintenanceBuckets = [],
  } = filters;

  return carList.filter((c) => {
    if (priceMin != null && c.price < priceMin) return false;
    if (priceMax != null && c.price > priceMax) return false;
    if (brands.length && !brands.includes(c.brand)) return false;
    if (yearMin != null && c.year < yearMin) return false;
    if (yearMax != null && c.year > yearMax) return false;
    if (fuels.length && !fuels.includes(c.fuel)) return false;
    if (transmissions.length && !transmissions.includes(c.transmission)) return false;
    if (owners.length) {
      const ownerLabel = c.owners >= 3 ? '3+' : String(c.owners);
      if (!owners.includes(ownerLabel)) return false;
    }
    if (conditions.length && !conditions.includes(c.condition)) return false;
    if (mileageBuckets.length) {
      const bucket = c.mileageKm < 50000 ? 'under50' : c.mileageKm <= 80000 ? '50to80' : 'above80';
      if (!mileageBuckets.includes(bucket)) return false;
    }
    if (maintenanceBuckets.length) {
      const m = c.estimatedAnnualMaintenance;
      const bucket = m < 25000 ? 'under25k' : m <= 50000 ? '25to50k' : m <= 100000 ? '50to100k' : 'above100k';
      if (!maintenanceBuckets.includes(bucket)) return false;
    }
    return true;
  });
}

export function sortCars(carList, sortBy) {
  const sorted = [...carList];
  switch (sortBy) {
    case 'priceLow': return sorted.sort((a, b) => a.price - b.price);
    case 'priceHigh': return sorted.sort((a, b) => b.price - a.price);
    case 'newest': return sorted.sort((a, b) => b.year - a.year);
    case 'lowestMileage': return sorted.sort((a, b) => a.mileageKm - b.mileageKm);
    case 'lowestMaintenance': return sorted.sort((a, b) => a.estimatedAnnualMaintenance - b.estimatedAnnualMaintenance);
    default: return sorted;
  }
}
