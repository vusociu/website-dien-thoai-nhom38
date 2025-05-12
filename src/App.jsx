import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Broad from './pages/Broads/_id';
import SortedPage from './pages/SortedPage';
import SearchPage from './pages/SearchPage';
import CategoryPage from './pages/CategoryPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import UserProfileEditPage from './pages/UserProfileEditPage';
import Success from './pages/Success';
import Admin from './pages/Admin';
import Detail from './pages/Detail';
import { useAuth } from './context/AuthContext';

function App() {
  const { isAuthenticated, user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if ((isAuthenticated && user) || !isAuthenticated) {
      setIsLoading(false);
    }
  }, [isAuthenticated, user]);
  
  const canAccessAdmin = () => {
    if (!user) return false;
    return user.roleId === 1;
  };

  if (isLoading) return;
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Broad />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/category" element={<CategoryPage />} />
        <Route path="/sort" element={<SortedPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/checkout/success" element={<Success />} />
        <Route path="/edit-profile" element={<UserProfileEditPage />} />
        <Route path="/detail" element={<Detail />} />
        <Route 
          path="/admin" 
          element={canAccessAdmin() ? <Admin /> : <Navigate to="/" />} 
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
