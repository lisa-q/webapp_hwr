import { useNavigate } from "react-router-dom";
import "./Home.css";

/**
 * Home component for the landing page of the application.
 * Displays a welcome message, a brief description of the shop, and a button to navigate to the product collection.
 *
 * @component
 * @example
 * <Home />
 */
const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container d-flex align-items-center justify-content-center">
      <div className="home-card card shadow-lg border-0">
        <div className="row g-0">
          <div className="col-md-6">
            <img
              src="/src/assets/shop_from_outside.png"
              className="img-fluid home-image"
              alt="Furtastic Fashion Shop"
            />
          </div>
          <div className="col-md-6 d-flex flex-column justify-content-center p-4">
            <h1 className="home-title text-center mb-4">
              Willkommen bei Furtastic Fashion!
            </h1>
            <p className="text-muted text-center mb-4">
              Die gemütlichste Boutique für tierische Mode – gemacht für Pfoten,
              Flügel und Fellnasen.
            </p>
            <p className="text-center">
              Ob flauschiger Hoodie oder magische Accessoires – hier finden
              deine tierischen Freunde die perfekten Outfits.
            </p>
            <div className="text-center mt-4">
              <button
                className="btn btn-warning btn-lg home-button"
                onClick={() => navigate("/shop")}
              >
                Zur Kollektion
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
