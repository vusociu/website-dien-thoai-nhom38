import * as React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Broad from './pages/Broads/_id';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Broad />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
