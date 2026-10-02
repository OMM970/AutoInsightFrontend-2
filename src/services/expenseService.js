import initialExpenses, { ownedCar } from '../data/expenses';

const delay = (ms = 200) => new Promise((res) => setTimeout(res, ms));

let expenseStore = [...initialExpenses];
let nextId = expenseStore.length + 1;

export async function getExpenses() {
  await delay();
  return [...expenseStore].sort((a, b) => new Date(a.date) - new Date(b.date));
}

export async function addExpense(expense) {
  await delay();
  const newExpense = { id: `e${nextId++}`, ...expense };
  expenseStore = [...expenseStore, newExpense];
  return newExpense;
}

export async function getOwnedCar() {
  await delay();
  return ownedCar;
}

export function getTotalSpent(expenseList) {
  return expenseList.reduce((sum, e) => sum + Number(e.amount), 0);
}
