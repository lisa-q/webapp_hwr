import { useState } from "react";
import "./ProductOverview.css";
import { Link } from "react-router-dom";

const products = [
    { id: 1, name: "Stylischer Hundehoodie", image: "/src/assets/stylischer_hundehoodie.webp", price: "29,99€" },
    { id: 2, name: "Magisches Katzenhalsband", image: "/src/assets/magisches_katzenhalsband.webp", price: "19,99€" },
    { id: 3, name: "Eleganter Papageienhut", image: "/src/assets/eleganter_papageienhut.webp", price: "14,99€" }
];

const ProductOverview = () => {
    const [searchTerm, setSearchTerm] = useState("");

    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="product-overview-container">
            <h1 className="text-center product-title">Unsere Kollektion</h1>

            <div className="search-bar-container text-center mb-4">
                <input
                    type="text"
                    placeholder="Suche nach Produkten..."
                    className="search-input"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="product-list">
                {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                        <div key={product.id} className="product-card card shadow-sm">
                            <img src={product.image} alt={product.name} className="product-image" />
                            <div className="card-body text-center">
                                <h5 className="product-name">{product.name}</h5>
                                <p className="product-price">{product.price}</p>
                                <Link to={`/product/${product.id}`} className="btn btn-success">
                                    Details ansehen
                                </Link>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center">Keine Produkte gefunden</p>
                )}
            </div>
        </div>
    );
};

export default ProductOverview;
