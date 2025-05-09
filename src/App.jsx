import * as React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Broad from './pages/Broads/_id';
import SearchPage from './pages/SearchPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import UserProfileEditPage from './pages/UserProfileEditPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Broad />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/edit-profile" element={<UserProfileEditPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
