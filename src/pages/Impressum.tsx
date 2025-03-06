// Impressum.tsx
import "./Impressum.css";

const Impressum = () => {
  return (
    <div className="impressum-container d-flex align-items-center justify-content-center">
      <div className="impressum-card card shadow-lg border-0">
        <div className="p-4 text-center">
          <h1 className="impressum-title mb-4">Impressum & Kontakt</h1>
          <p className="text-muted mb-4">
            Hier findest du unsere Kontaktdetails und Öffnungszeiten.
          </p>

          <h3 className="mb-3">Anschrift & Kontakt</h3>
          <p>Furtastic Fashion GmbH</p>
          <p>123 Pet Street, 56789 Animal Town</p>
          <p>E-Mail: contact@furtasticfashion.com</p>
          <p>Telefon: +49 123 456789</p>

          <h3 className="mt-4">Öffnungszeiten</h3>
          <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
          <p>Saturday: 10:00 AM - 4:00 PM</p>
          <p>Sunday: Closed</p>

          <h3 className="mt-4">Kontaktiere uns!</h3>
          <form className="contact-form">
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Dein Name"
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="email"
                className="form-control"
                placeholder="Deine E-Mail"
                required
              />
            </div>
            <div className="mb-3">
              <textarea
                className="form-control"
                rows={4}
                placeholder="Deine Nachricht"
                required
              ></textarea>
            </div>
            <button type="submit" className="btn btn-success">
              Abschicken
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Impressum;
