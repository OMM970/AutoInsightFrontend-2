
const API_BASE_URL = 'http://localhost:8083/api/v1/dealer';

function mapDealer(dealer) {
  return {
    id: dealer.dealerId,
    name: dealer.dealerName,
    area: dealer.location,
    city: dealer.location,
    address: dealer.address,
    contactNumber: dealer.contactNumber,
    email: dealer.email,
    rating: dealer.rating,
    reviewCount: dealer.reviewCount,
    startingPrice: dealer.startingPrice,
    totalCarsAvailable: dealer.totalCarsAvailable,
    verified: dealer.verified,
  };
}

// GET /api/v1/dealer
export async function getDealers({ query = '', city = '' } = {}) {

  const response = await fetch(API_BASE_URL);

  if (!response.ok) {
    throw new Error('Failed to fetch dealers');
  }

  const data = await response.json();

  const dealers = data.map(mapDealer);

  const q = query.trim().toLowerCase();

  return dealers.filter((dealer) => {

    const matchesQuery =
      !q ||
      dealer.name.toLowerCase().includes(q) ||
      dealer.area.toLowerCase().includes(q) ||
      dealer.city.toLowerCase().includes(q);

    const matchesCity =
      !city || dealer.city === city;

    return matchesQuery && matchesCity;
  });
}

// GET /api/v1/dealer/{dealerId}
export async function getDealerById(id) {

  const response = await fetch(
    `${API_BASE_URL}/${id}`
);

if (!response.ok) {

  if (response.status === 404) {
    return null;
  }

  throw new Error('Failed to fetch dealer');
}

const data = await response.json();

return mapDealer(data);
}

export function getCities(dealers = []) {
  return [
    ...new Set(
        dealers
            .map((dealer) => dealer.city)
            .filter(Boolean)
    ),
  ];
}

