import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Impressum from "./pages/Impressum";
import Navbar from "./components/Navbar";
import Cart from "./pages/Cart";
import ProductOverview from "./pages/ProductOverview";
import ProductDetail from "./pages/ProductDetail";
import OrderHistory from "./pages/OrderHistory";
import "./App.css";

import Checkout from "./pages/Checkout";
import MostBoughtItems from "./pages/MostBoughtItems";

function App() {
  return (
    <Router>
      <Navbar />
      <div id="dynamic-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/impressum" element={<Impressum />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/shop" element={<ProductOverview />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/orderHistory" element={<OrderHistory />} />
          <Route path="/mostBoughtItems" element={<MostBoughtItems />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
