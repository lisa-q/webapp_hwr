import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import CartOverlay from "./CartOverlay";
import CartBadge from "./CartBatch";
import "./Navbar.css";

const Navbar = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const location = useLocation();

  useEffect(() => {
    setIsCartOpen(false);
  }, [location.pathname]);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-custom fixed-top p-3">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand">
            Furtastic Fashion
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link to="/shop" className="nav-link">
                  Shop
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/about" className="nav-link">
                  Über uns
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/impressum" className="nav-link">
                  Impressum
                </Link>
              </li>
              <li className="nav-item position-relative">
                <button
                  className="nav-link d-flex align-items-center justify-content-center border rounded p-2 bg-transparent position-relative"
                  onClick={() => setIsCartOpen(!isCartOpen)}
                >
                  <i className="bi bi-basket2-fill"></i>
                  <CartBadge />{" "}
                </button>
                {isCartOpen && (
                  <CartOverlay onClose={() => setIsCartOpen(false)} />
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
