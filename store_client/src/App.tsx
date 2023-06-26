import React from "react";
import { useEffect, useState } from "react";
import { Product } from "./App/Models/Product";

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    fetch("http://localhost:5009/api/products")
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, []);
  return (
    <div className="App">
      {products.map((product) => (
        <div key={product.id}>
          {product.name} -- {product.price}
        </div>
      ))}
    </div>
  );
}

export default App;
