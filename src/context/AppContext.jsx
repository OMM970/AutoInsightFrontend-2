import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { getExpenses, addExpense as addExpenseSvc, getOwnedCar } from '../services/expenseService';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [expenses, setExpenses] = useState([]);
  const [ownedCar, setOwnedCar] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getExpenses(), getOwnedCar()]).then(([exp, car]) => {
      setExpenses(exp);
      setOwnedCar(car);
      setLoading(false);
    });
  }, []);

  const addExpense = useCallback(async (expense) => {
    const created = await addExpenseSvc(expense);
    setExpenses((prev) => [...prev, created].sort((a, b) => new Date(a.date) - new Date(b.date)));
    return created;
  }, []);

  return (
    <AppContext.Provider value={{ expenses, ownedCar, loading, addExpense }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useAppContext must be used within AppProvider');
  return ctx;
}
