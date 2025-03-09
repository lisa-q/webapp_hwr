import { useEffect, useState } from "react";
import { Product } from "../models/types";
import ProductFirebaseService from "../services/ProductFirebaseService";
import "./MostBoughtItems.css";

const MostBoughtItems = () => {
  const [topProducts, setTopProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const allProducts = await ProductFirebaseService.getAllProducts();
      const sortedProducts = allProducts
        .filter((product) => product.numberOfBuys)
        .sort((a, b) => (b.numberOfBuys ?? 0) - (a.numberOfBuys ?? 0))
        .slice(0, 3);

      setTopProducts(sortedProducts);
    };

    fetchProducts();
  }, []);

  return (
    <div className="container mt-5 text-center">
      <h2 className="mb-4">🏆 Meistgekaufte Produkte 🏆</h2>
      <div className="d-flex justify-content-center align-items-end gap-4">
        {topProducts.length >= 2 && (
          <div className="position-relative  text-dark p-3 rounded second-place">
            <h4>🥈 {topProducts[1].name}</h4>
            <img
              src={topProducts[1].image}
              alt={topProducts[1].name}
              className="img-fluid"
              style={{ maxHeight: "150px" }}
            />
            <p>{topProducts[1].numberOfBuys}x gekauft</p>
          </div>
        )}
        {topProducts.length >= 1 && (
          <div className="position-relative  text-dark p-4 rounded first-place">
            <h3>🥇 {topProducts[0].name}</h3>
            <img
              src={topProducts[0].image}
              alt={topProducts[0].name}
              className="img-fluid"
              style={{ maxHeight: "180px" }}
            />
            <p>{topProducts[0].numberOfBuys}x gekauft</p>
          </div>
        )}
        {topProducts.length >= 3 && (
          <div className="position-relative text-dark p-3 rounded third-place">
            <h4>🥉 {topProducts[2].name}</h4>
            <img
              src={topProducts[2].image}
              alt={topProducts[2].name}
              className="img-fluid"
              style={{ maxHeight: "150px" }}
            />
            <p>{topProducts[2].numberOfBuys}x gekauft</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MostBoughtItems;
