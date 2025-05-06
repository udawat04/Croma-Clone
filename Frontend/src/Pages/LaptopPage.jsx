import React, { useState } from "react";
import Cards from "../Components/Cards";
import FilterSidebar from "../Components/FilterSidebar";
import { useProduct } from "../Services/ProductContextApi";

const LaptopPage = () => {
  const { products } = useProduct();
  const productType = "Laptop";

  const [filters, setFilters] = useState({
    price: [],
    brand: [],
    ram: [],
    storage: [],
  });

  const handleFilterChange = (group, values) => {
    setFilters((prev) => ({
      ...prev,
      [group]: values,
    }));
  };

 const applyFilters = (products) => {
   return products.filter((product) => {
     if (product.type.toLowerCase() !== productType.toLowerCase()) return false;

     const { price, brand, ram, storage } = filters;

     const productPrice = product.newPrice;
     const productBrand = product.brandName?.toLowerCase();
     const productRam = product.ram?.toLowerCase();
     const productStorage = product.storage?.toLowerCase();

     if (
       price.length &&
       !price.some((range) => {
         if (range === "Under ₹10,000") return productPrice < 10000;
         if (range === "₹10,000 - ₹20,000")
           return productPrice >= 10000 && productPrice <= 20000;
         if (range === "₹20,000 - ₹30,000")
           return productPrice >= 20000 && productPrice <= 30000;
         if (range === "Above ₹30,000") return productPrice > 30000;
         return true;
       })
     ) {
       return false;
     }

     if (brand.length && !brand.some((b) => b.toLowerCase() === productBrand))
       return false;
     if (ram.length && !ram.some((r) => r.toLowerCase() === productRam))
       return false;
     if (
       storage.length &&
       !storage.some((s) => s.toLowerCase() === productStorage)
     )
       return false;

     return true;
   });
 };


  const filteredProducts = applyFilters(products);

  return (
    <div className="bg-gray-100 min-h-screen">
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-6">
          <div className="flex justify-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 border-b-2 pb-2 border-indigo-600 capitalize">
              💻 Explore Our Latest Laptops
            </h1>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            <FilterSidebar
              filters={filters}
              onFilterChange={handleFilterChange}
              pageType="laptop"
            />

            <div className="flex-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product) => (
                    <Cards key={product.id} product={product} />
                  ))
                ) : (
                  <p className="text-gray-600 text-center w-full">
                    No laptop products available.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LaptopPage;
