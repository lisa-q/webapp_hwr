import "./ProductDetail.css";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Product } from "../models/types";
import ProductFirebaseService from "../services/ProductFirebaseService";
import CartFirebaseService from "../services/CartFirebaseService";
const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();

  const [product, setProduct] = useState<Product | null>(null);
  useEffect(() => {
    if (!id) return;
    const fetchProduct = async () => {
      const fetchedProduct = await ProductFirebaseService.getProductById(id);
      setProduct(fetchedProduct);
    };
    fetchProduct();
  }, []);

  const handleAddToCart = async (product: Product) => {
    const cartItem = { ...product, quantity: 1 };
    await CartFirebaseService.addToCart(cartItem);
  };

  if (!product) {
    return (
      <div className="text-center mt-5">
        <h2>Produkt nicht gefunden</h2>
        <p>Das gewünschte Produkt existiert nicht oder wurde entfernt.</p>
      </div>
    );
  }

  return (
    <div className="product-detail-container">
      <div className="product-detail-card card shadow-lg">
        <img
          src={product.image}
          alt={product.name}
          className="product-detail-image"
        />
        <div className="card-body text-center">
          <h1 className="product-detail-title">{product.name}</h1>
          <p className="product-detail-description">
            {product.description.split("\n").map((line, index) => (
              <span key={index}>
                {line}
                <br />
              </span>
            ))}
          </p>
          <p className="product-detail-price">{product.price}</p>
          <button
            className="btn btn-success btn-lg"
            onClick={() => handleAddToCart(product)}
          >
            In den Warenkorb
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
