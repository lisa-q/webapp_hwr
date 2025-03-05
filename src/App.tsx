import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Impressum from "./pages/Impressum";
import ProductOverview from "./pages/ProductOverview";
import ProductDetail from "./pages/ProductDetail";
import Navbar from "./components/Navbar";
import { CartProvider } from "./context/CartContext"; // Importiere den Warenkorb-Context
import "./App.css";
import Cart from "./pages/Cart";

function App() {
    return (
        <CartProvider> {/* Warenkorb-Provider um alles */}
            <Router>
                <Navbar />
                <div id="dynamic-content">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/impressum" element={<Impressum />} />
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/shop" element={<ProductOverview />} />
                        <Route path="/product/:id" element={<ProductDetail />} />

                    </Routes>
                </div>
            </Router>
        </CartProvider>
    );
}

export default App;
