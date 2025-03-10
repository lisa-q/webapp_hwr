import "./Impressum.css";

/**
 * Impressum component for displaying contact information and business hours.
 * Shows the address, email, phone number, and the shop's opening hours.
 *
 * @component
 * @example
 * <Impressum />
 */

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
          <p>Haustierstraße 7, 12635 Karottingen</p>
          <p>E-Mail: contact@furtasticfashion.de</p>
          <p>Telefon: +49 123 456789</p>
          <h3 className="mt-4">Öffnungszeiten</h3>
          <p>Montag - Freitag: 9:00 - 18:00 Uhr</p>
          <p>Samstag: 10:00 - 16:00 Uhr</p>
          <p>Sonntag: Geschlossen</p>
        </div>
      </div>
    </div>
  );
};

export default Impressum;
