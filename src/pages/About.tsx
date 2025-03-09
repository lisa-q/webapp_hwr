import "./About.css";

/**
 * Represents the About page for the Furtastic Fashion website.
 *
 * @component
 * @description
 * This component displays information about Furtastic Fashion, including
 * an introduction to the brand, its values, and its product offerings for pets.
 * It includes a description of the boutique's mission to provide stylish,
 * comfortable, and sustainable clothing for pets.
 *
 * @example
 * <About />
 */
const About = () => {
  return (
    <div className="about-container d-flex align-items-center justify-content-center">
      <div className="about-card card shadow-lg border-0">
        <div className="p-4 text-center">
          <h1 className="about-title mb-4">Über Furtastic Fashion</h1>
          <p className="text-muted mb-4">
            Willkommen bei Furtastic Fashion - der charmantesten Boutique für
            Tiermode!{" "}
          </p>
          <p>
            Wir glauben, dass jedes Haustier seinen eigenen Stil verdient hat.
            Ob kuschelige Pullover, elegante Accessoires oder wetterfeste Mäntel
            - wir entwerfen Mode mit Liebe und Sorgfalt für alle pelzigen (und
            gefiederten) Freunde.
          </p>
          <p>
            Unser Ziel ist es, nicht nur modische, sondern auch bequeme und
            nachhaltige Kleidung für Haustiere. Qualität, Spaß und Wohlbefinden
            sind unsere obersten Prioritäten.
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
