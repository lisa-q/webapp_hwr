import React, { useEffect, useState } from "react";
import ProductService from "../services/ProductService";
import { Product } from "../models/Product";

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [newProductName, setNewProductName] = useState("");
  const [newProductPrice, setNewProductPrice] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      const products = await ProductService.getAllProducts();
      setProducts(products);
    };

    fetchProducts();

    const unsubscribe = ProductService.listenToProducts((updatedProducts) => {
      setProducts(updatedProducts);
    });

    return () => unsubscribe();
  }, []);

  const addProduct = async () => {
    if (newProductName && newProductPrice) {
      await ProductService.addProduct({
        name: newProductName,
        price: parseFloat(newProductPrice),
      });
      setNewProductName("");
      setNewProductPrice("");
    }
  };

  const deleteProduct = async (id: string) => {
    await ProductService.deleteProduct(id);
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Product List</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} - {product.price.toFixed(2)} €
            <button onClick={() => deleteProduct(product.id)}>Löschen</button>
          </li>
        ))}
      </ul>
      <div>
        <input
          type="text"
          placeholder="Product Name"
          value={newProductName}
          onChange={(e) => setNewProductName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Product Price"
          value={newProductPrice}
          onChange={(e) => setNewProductPrice(e.target.value)}
        />
        <button onClick={addProduct}>Add Product</button>
      </div>
    </div>
  );
};

export default ProductList;
