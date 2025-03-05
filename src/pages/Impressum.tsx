// Impressum.tsx
import "./Impressum.css";

const Impressum = () => {
    return (
        <div className="impressum-container d-flex align-items-center justify-content-center">
            <div className="impressum-card card shadow-lg border-0">
                <div className="p-4 text-center">
                    <h1 className="impressum-title mb-4">Imprint & Contact</h1>
                    <p className="text-muted mb-4">
                        Here you can find our company details, contact information, and business hours.
                    </p>

                    <h3 className="mb-3">Company Information</h3>
                    <p>Furtastic Fashion GmbH</p>
                    <p>123 Pet Street, 56789 Animal Town</p>
                    <p>Email: contact@furtasticfashion.com</p>
                    <p>Phone: +49 123 456789</p>

                    <h3 className="mt-4">Business Hours</h3>
                    <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                    <p>Saturday: 10:00 AM - 4:00 PM</p>
                    <p>Sunday: Closed</p>

                    <h3 className="mt-4">Contact Us</h3>
                    <form className="contact-form">
                        <div className="mb-3">
                            <input type="text" className="form-control" placeholder="Your Name" required />
                        </div>
                        <div className="mb-3">
                            <input type="email" className="form-control" placeholder="Your Email" required />
                        </div>
                        <div className="mb-3">
                            <textarea className="form-control" rows={4} placeholder="Your Message" required></textarea>
                        </div>
                        <button type="submit" className="btn btn-success">Send Message</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Impressum;
