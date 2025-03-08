import { Link } from "react-router-dom";
import "./ThankPage.css";

const ThankPage = () => {
    return (
        <div className="container thank-container">
            <h2>Vielen Dank für deine Bestellung! 🎉</h2>
            <p>
                Deine Bestellung wurde erfolgreich aufgegeben.
                Falls du Fragen hast, stehen wir dir gerne über unser Kontaktformular zur Verfügung.
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
