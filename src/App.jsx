import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Box } from '@mui/material';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

import Home from './pages/Home';
import SearchShops from './pages/SearchShops';
import ShopListing from './pages/ShopListing';
import CarDetails from './pages/CarDetails';
import Inspection from './pages/Inspection';
import AIAnalysis from './pages/AIAnalysis';
import OwnershipCost from './pages/OwnershipCost';
import Dashboard from './pages/Dashboard';
import AddExpense from './pages/AddExpense';
import NotFound from './pages/NotFound';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

export default function App() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <ScrollToTop />
      <Navbar />
      <Box component="main" sx={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dealers" element={<SearchShops />} />
          <Route path="/dealers/:dealerId" element={<ShopListing />} />
          <Route path="/cars/:carId" element={<CarDetails />} />
          <Route path="/cars/:carId/inspection" element={<Inspection />} />
          <Route path="/cars/:carId/ai-analysis" element={<AIAnalysis />} />
          <Route path="/cars/:carId/ownership-cost" element={<OwnershipCost />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/add-expense" element={<AddExpense />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Box>
      <Footer />
    </Box>
  );
}
