// Mock "owned car" + actual expense history, used to power the customer
// dashboard. In production this would come from GET /api/expenses.
export const ownedCar = {
  carId: 'c1',
  nickname: 'My Hyundai Creta',
  purchaseDate: '2026-06-15',
  purchasePrice: 900000,
  ownershipYears: 3,
};

const initialExpenses = [
  { id: 'e1', category: 'Service', amount: 4000, date: '2026-09-10', description: 'Oil & filter change, routine service' },
  { id: 'e2', category: 'Brakes', amount: 8000, date: '2026-12-02', description: 'Front brake pad replacement' },
  { id: 'e3', category: 'Tyres', amount: 28000, date: '2027-03-18', description: 'Replaced front tyres (wear detected at inspection)' },
];

export default initialExpenses;
