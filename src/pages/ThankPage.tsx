import { Link } from "react-router-dom";
import "./ThankPage.css";

const ThankPage = () => {
    return (
        <div className="container thank-container">
            <h2>Vielen Dank für Ihre Bestellung! 🎉</h2>
            <p>
                Ihre Bestellung wurde erfolgreich aufgegeben.
                Falls Sie Fragen haben, stehen wir Ihnen gerne zur Verfügung.
            </p>

            <div className="thank-buttons">
                <Link to="/shop" className="btn btn-success">
                    Weiter einkaufen
                </Link>
                <Link to="/" className="btn btn-primary">
                    Zur Startseite
                </Link>
            </div>
        </div>
    );
};

export default ThankPage;
