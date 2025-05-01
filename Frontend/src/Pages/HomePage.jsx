import React from "react";
import Banner from "../Components/Banner";
import HeroSection from "../Components/HeroSection";
import ProductCard from "../Components/ProductCard";
import { useProduct } from "../Services/ProductContextApi";

const HomePage = () => {
  const { products } = useProduct();

  // Get 4 random products
  const randomProducts = [...products]
    .sort(() => 0.5 - Math.random())
    .slice(0, 4);

  // Group products by type
  const categoryData = products.reduce((acc, item) => {
    acc[item.type] = [...(acc[item.type] || []), item];
    return acc;
  }, {});

  return (
    <div>
      <Banner />
      <HeroSection />

      {/* New Products Section */}
      <div className="mx-auto p-12 font-bold text-2xl">
        <h1>New Products</h1>
        <div className="lg:flex lg:flex-wrap px-14 mt-10 lg:px-28 lg:gap-6">
          {randomProducts.map((item) => (
            <ProductCard
              key={item.id}
              id={item.id}
              productName={item.productName}
              brandName={item.brandName}
              type={item.type}
              oldPrice={item.oldPrice}
              newPrice={item.newPrice}
              description={item.description}
              image={item.imageUrl}
            />
          ))}
        </div>
      </div>

      {/* Category-wise Products */}
      {["Ac", "Laptop", "Mobile"].map(
        (category) =>
          categoryData[category] && (
            <div key={category} className="mx-auto p-12 font-bold text-2xl">
              <h1 className="px-32 font-bold text-3xl">{category}</h1>
              <div className="lg:flex lg:flex-wrap px-14 mt-10 lg:px-28 lg:gap-6">
                {categoryData[category].slice(0,8).map((item) => (
                  <ProductCard
                    key={item.id}
                    id={item.id}
                    productName={item.productName}
                    brandName={item.brandName}
                    type={item.type}
                    oldPrice={item.oldPrice}
                    newPrice={item.newPrice}
                    description={item.description}
                    image={item.imageUrl}
                  />
                ))}
              </div>
            </div>
          )
      )}

      <HeroSection />
    </div>
  );
};

export default HomePage;
