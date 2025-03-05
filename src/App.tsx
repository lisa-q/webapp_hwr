import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Impressum from "./pages/Impressum";
import Navbar from "./components/Navbar";
import Cart from "./pages/Cart";
import "./App.css";

const cartItems = [
  {
    id: 1,
    name: "Hamster",
    image: "src/assets/hamster.avif",
    quantity: 1,
    price: 999.99,
  },
  {
    id: 2,
    name: "Dog",
    image: "src/assets/dog.avif",
    quantity: 2,
    price: 49.99,
  },
  {
    id: 3,
    name: "Fox",
    image: "src/assets/fox.avif",
    quantity: 1,
    price: 699.99,
  },
];

function App() {
  return (
    <Router>
      <Navbar />
      <div id="dynamic-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/impressum" element={<Impressum />} />
          <Route path="/cart" element={<Cart cartItems={cartItems} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
