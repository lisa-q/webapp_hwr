import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Impressum from "./pages/Impressum";
import Navbar from "./components/Navbar";
import Cart from "./pages/Cart";
import "./App.css";

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
        </Routes>
      </div>
    </Router>
  );
}

export default App;
