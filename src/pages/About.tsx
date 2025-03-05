import "./About.css";

const About = () => {
    return (
        <div className="about-container d-flex align-items-center justify-content-center">
            <div className="about-card card shadow-lg border-0">
                <div className="p-4 text-center">
                    <h1 className="about-title mb-4">About Furtastic Fashion</h1>
                    <p className="text-muted mb-4">
                        Welcome to Furtastic Fashion - the most charming boutique for pet fashion!                    </p>
                    <p>
                        We believe that every pet deserves its own style. Whether cozy sweaters,
                        elegant accessories or weatherproof coats - we design fashion with love and care
                        for all furry (and feathered) friends.
                    </p>
                    <p>
                        Our aim is to produce not only fashionable, but also comfortable and sustainable clothing
                        for pets. Quality, fun and well-being are our top priorities.
                    </p>
                    <p className="text-muted fst-italic">
                        "We make tails wag & whiskers twitch with style!"
                    </p>
                </div>
            </div>
        </div>
    );
};

export default About;

