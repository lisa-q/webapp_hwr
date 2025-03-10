import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Product } from "../models/types";
import ProductFirebaseService from "../services/ProductFirebaseService";
import CartFirebaseService from "../services/CartFirebaseService";
import "./ProductOverview.css";

/**
 * ProductOverview component to display a list of products with search functionality.
 * Fetches all products from Firebase and allows adding products to the cart.
 * Includes a search bar to filter products by name.
 *
 * @component
 * @example
 * <ProductOverview />
 */

const ProductOverview = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const [products, setProducts] = useState<Product[]>([]);

  /**
   * Fetches all products from Firebase and updates the state.
   */
  useEffect(() => {
    const fetchProducts = async () => {
      const fetchedProducts = await ProductFirebaseService.getAllProducts();
      setProducts(fetchedProducts);
    };
    fetchProducts();
  }, []);

  /**
   * Adds a selected product to the cart with a default quantity of 1.
   *
   * @param {Product} product - The product to be added to the cart.
   * @returns {Promise<void>} A promise that resolves once the product is added.
   */
  const handleAddToCart = async (product: Product) => {
    const cartItem = { ...product, quantity: 1 };
    await CartFirebaseService.addToCart(cartItem);
  };

  /**
   * Filters the list of products based on the current search term.
   */
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
                <p className="product-price">{product.price} €</p>
                <Link to={`/product/${product.id}`} className="btn btn-orange">
                  Details ansehen
                </Link>
                <button
                  className="btn btn-warning mt-2"
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
