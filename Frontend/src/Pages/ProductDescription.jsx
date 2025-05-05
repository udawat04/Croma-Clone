import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useProduct } from "../Services/ProductContextApi";

const ProductDescription = () => {
  let { id } = useParams();
  const productId = parseInt(id); // ✅ Convert to number

  const { products } = useProduct();
  const product = products.find((item) => item.id === productId); // ✅ Compare with number

  const [isInCart, setIsInCart] = useState(false);
  const userData = JSON.parse(localStorage.getItem("UserData"));
  const userId = userData?._id;

  // Sync state on load and whenever localStorage changes
  useEffect(() => {
    const storedCartIds =
      JSON.parse(localStorage.getItem("cartProductIds")) || [];
    setIsInCart(storedCartIds.includes(String(productId)));
  }, [productId]);

  if (!product) {
    return (
      <div className="text-center py-20 text-xl text-red-600">
        Product not found
      </div>
    );
  }

  const {
    productName,
    brandName,
    type,
    oldPrice,
    newPrice,
    description,
    imageUrl,
  } = product;

  const handleAddToCart = async () => {
    if (!userId) {
      alert("Please login first");
      return;
    }

    let cartProductIds =
      JSON.parse(localStorage.getItem("cartProductIds")) || [];

    // Check if the product is already in the cart
    if (cartProductIds.includes(String(product.id))) {
      alert("This product is already in your cart.");
      return; // Don't add it again
    }

    const payload = {
      userId,
      product: {
        _id: product.id,
        name: productName,
        price: newPrice,
        image: imageUrl,
        category: type,
      },
      quantity: 1,
    };

    try {
      const res = await fetch("http://localhost:4000/addcart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (data.success) {
        cartProductIds.push(String(product.id)); // Add the product to cartProductIds
        localStorage.setItem("cartProductIds", JSON.stringify(cartProductIds));
        setIsInCart(true); // Set the button to "Cart Added"
        alert("Added to cart successfully");
      } else {
        alert(data.message || "Something went wrong");
      }
    } catch (error) {
      alert("Failed to modify cart: " + error.message);
    }
  };

  const handleRemoveFromCart = async () => {
    if (!userId) {
      alert("Please login first");
      return;
    }

    let cartProductIds =
      JSON.parse(localStorage.getItem("cartProductIds")) || [];

    if (!cartProductIds.includes(String(product.id))) {
      alert("This product is not in your cart.");
      return;
    }

    try {
      const res = await fetch(
        `http://localhost:4000/user/${userId}/product/${product.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await res.json();
      if (data.success) {
        cartProductIds = cartProductIds.filter(
          (id) => id !== String(product.id)
        ); // Remove product from cartProductIds
        localStorage.setItem("cartProductIds", JSON.stringify(cartProductIds));
        setIsInCart(false); // Set the button to "Add to Cart"
        alert("Removed from cart successfully");
      } else {
        alert(data.message || "Something went wrong");
      }
    } catch (error) {
      alert("Failed to remove from cart: " + error.message);
    }
  };

  return (
    <div>
      <section className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="relative">
            <img
              src={imageUrl}
              alt={productName}
              className="w-full rounded-xl shadow-lg"
            />
            <span className="absolute top-4 left-4 bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded">
              {Math.round(((oldPrice - newPrice) / oldPrice) * 100)}% OFF
            </span>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">{productName}</h1>
            <p className="text-sm text-gray-500">
              Brand: {brandName} | Type: {type}
            </p>

            {/* Pricing */}
            <div className="flex items-center space-x-4">
              <span className="text-2xl font-bold text-gray-900">
                ₹{newPrice}
              </span>
              <span className="text-sm line-through text-gray-500">
                ₹{oldPrice}
              </span>
              <span className="text-sm text-green-600 font-semibold">
                Inclusive of all taxes
              </span>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={isInCart ? handleRemoveFromCart : handleAddToCart}
              className={`w-full ${
                isInCart ? "bg-green-600" : "bg-indigo-600"
              } text-white text-sm font-medium py-3 rounded-lg hover:bg-indigo-700 transition`}
            >
              {isInCart ? "Cart Added" : "Add to Cart"}
            </button>

            {/* Product Description */}
            <div className="mt-4">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                Product Description
              </h2>
              <p className="text-sm text-gray-600">{description}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductDescription;
