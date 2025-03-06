import { useState, useEffect } from "react";
import "./ProductOverview.css";
import { Link } from "react-router-dom";
import { Product } from "../models/types";
import ProductFirebaseService from "../services/ProductFirebaseService";
import CartFirebaseService from "../services/CartFirebaseService";

const ProductOverview = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    const fetchProducts = async () => {
      const fetchedProducts = await ProductFirebaseService.getAllProducts();
      setProducts(fetchedProducts);
    };
    fetchProducts();
  }, []);

  const handleAddToCart = async (product: Product) => {
    const cartItem = { ...product, quantity: 1 };
    await CartFirebaseService.addToCart(cartItem);
  };

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
              <img
                src={product.image}
                alt={product.name}
                className="product-image"
              />
              <div className="card-body text-center">
                <h5 className="product-name">{product.name}</h5>
                <p className="product-price">{product.price}</p>
                <Link to={`/product/${product.id}`} className="btn btn-success">
                  Details ansehen
                </Link>
                <button
                  className="btn btn-primary mt-2"
                  onClick={() => handleAddToCart(product)}
                >
                  In den Warenkorb
                </button>
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
