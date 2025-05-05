/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useEffect, useState } from "react";

// 1. Create the context
const ProductContext = createContext();

// 2. Create the provider component
export const ProductProvider = ({ children }) => {
    console.log(children,"children");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const url =
        "https://gist.githubusercontent.com/udawat04/d0c3039938486942a8291dd40fb18f68/raw/e15a38568257d35a58fd4a8fbce9558d3ceb7d59/productdata.json";
      try {
        const response = await fetch(url);
        if (!response.ok)
          throw new Error(`HTTP error! Status: ${response.status}`);
        const data = await response.json();
        setProducts(data);
      
      } catch (err) {
        console.error("Fetch error:", err.message);
      }
    };

    fetchData();
  }, []);

  return (
    <ProductContext.Provider value={{ products }}>
      {children}
    </ProductContext.Provider>
  );
};

// 3. Custom hook to use context
export const useProduct = () => useContext(ProductContext);
