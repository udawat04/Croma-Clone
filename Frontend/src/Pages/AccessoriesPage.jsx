import React, { useState } from "react";
import Cards from "../Components/Cards";
import FilterSidebar from "../Components/FilterSidebar";
import { useProduct } from "../Services/ProductContextApi";

const AccessoriesPage = () => {
  const { products } = useProduct();
  const productType = "Accessory";

  const [filters, setFilters] = useState({
    price: [],
    brand: [],
    accessoryType: [],
    connectivity: [],
  });

  const handleFilterChange = (group, values) => {
    setFilters((prev) => ({
      ...prev,
      [group]: values,
    }));
  };

  // Apply filters
  const applyFilters = (products) => {
    return products.filter((product) => {
      if (product.type.toLowerCase() !== productType.toLowerCase())
        return false;

      const { price, brand, accessoryType, connectivity } = filters;

      const productPrice = product.newPrice;
      const productBrand = product.brandName?.toLowerCase();
      const productAccessoryType = product.accessoryType?.toLowerCase();
      const productConnectivity = product.connectivity?.toLowerCase();

      // Log the filters and product fields for debugging
      console.log("Filters:", filters);
      console.log("Product Accessory Type:", productAccessoryType);
      console.log("Product Connectivity:", productConnectivity);

      // Price filter
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

      // Brand filter
      if (brand.length && !brand.includes(productBrand)) return false;

      // Accessory Type filter
      if (
        accessoryType.length &&
        !accessoryType.some(
          (type) => type.toLowerCase() === productAccessoryType
        )
      ) {
        return false;
      }

      // Connectivity filter
      if (
        connectivity.length &&
        !connectivity.some((conn) => conn.toLowerCase() === productConnectivity)
      ) {
        return false;
      }

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
              🧰 Explore Our Latest Accessories
            </h1>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            <FilterSidebar
              filters={filters}
              onFilterChange={handleFilterChange}
              pageType="accessory"
            />

            <div className="flex-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product) => (
                    <Cards key={product.id} product={product} />
                  ))
                ) : (
                  <p className="text-gray-600 text-center w-full">
                    No accessory products available.
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

export default AccessoriesPage;
