import "./ProductDetail.css";
import { useParams } from "react-router-dom";

const productData: { [key: string]: { name: string; image: string; description: string; price: string } } = {
    "1": {
        name: "Stylischer Hundehoodie",
        image: "/src/assets/stylischer_hundehoodie.webp",
        description: "Ein gemütlicher Hoodie für kalte Tage.\n\nMaterial:\n95 % Baumwolle, 5 % Elasthan.",
        price: "29,99€"
    },
    "2": {
        name: "Magisches Katzenhalsband",
        image: "/src/assets/magisches_katzenhalsband.webp",
        description: "Verleiht deiner Katze einen edlen Look.\n\nMaterial:\nEdelstahl, vergoldet. Zirkonia.",
        price: "19,99€"
    },
    "3": {
        name: "Eleganter Papageienhut",
        image: "/src/assets/eleganter_papageienhut.webp",
        description: "Der perfekte Hut für stilbewusste Vögel.\n\nMaterial:\nFilz, Federn, Polyester, Metall.",
        price: "14,99€"
    }
};


const ProductDetail = () => {
    const { id } = useParams<{ id: string }>();
    const product = productData[id || "1"];

    return (
        <div className="product-detail-container">
            <div className="product-detail-card card shadow-lg">
                <img src={product.image} alt={product.name} className="product-detail-image" />
                <div className="card-body text-center">
                    <h1 className="product-detail-title">{product.name}</h1>
                    <p className="product-detail-description">{product.description}</p>
                    <p className="product-detail-price">{product.price}</p>
                    <button className="btn btn-success btn-lg">In den Warenkorb</button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
