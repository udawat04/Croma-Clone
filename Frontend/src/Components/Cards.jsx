import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Cards = ({ product }) => {
  const [isInCart, setIsInCart] = useState(false);
  const userData = JSON.parse(localStorage.getItem("UserData"));
  const userId = userData?._id;

  // Load cart items from localStorage and set the state
  useEffect(() => {
    const storedCartIds =
      JSON.parse(localStorage.getItem("cartProductIds")) || [];
    setIsInCart(storedCartIds.includes(String(product.id)));
  }, [product.id]);

  // Add or remove product from the cart
  const handleAddToCart = async () => {
    if (!userId) {
      alert("Please login first");
      return;
    }

    const payload = {
      userId,
      product: {
        _id: product.id, // Ensure using the correct field (_id)
        name: product.productName,
        price: product.newPrice,
        image: product.imageUrl,
        category: product.type,
      },
      quantity: 1,
    };

    try {
      let cartProductIds =
        JSON.parse(localStorage.getItem("cartProductIds")) || [];

      if (isInCart) {
        // Remove from cart
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
          );
          localStorage.setItem(
            "cartProductIds",
            JSON.stringify(cartProductIds)
          );
          setIsInCart(false);
          alert("Removed from cart");
        } else {
          alert(data.message || "Something went wrong");
        }
      } else {
        // Add to cart
        const res = await fetch("http://localhost:4000/addcart", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        const data = await res.json();
        if (data.success) {
          if (!cartProductIds.includes(String(product.id))) {
            cartProductIds.push(String(product.id)); // Add only if not already added
            localStorage.setItem(
              "cartProductIds",
              JSON.stringify(cartProductIds)
            );
            setIsInCart(true);
            alert("Added to cart successfully");
          } else {
            alert("Product already in cart");
          }
        } else {
          alert(data.message || "Something went wrong");
        }
      }
    } catch (error) {
      alert("Failed to modify cart: " + error.message);
    }
  };

  return (
    <div className="max-w-xs bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <Link to={`/product/${product.id}`}>
        <div className="relative">
          <img
            className="w-full h-52 object-contain"
            src={product.imageUrl}
            alt={product.productName}
          />
          <span className="absolute top-2 left-2 bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded">
            25% OFF
          </span>
        </div>
      </Link>

      <div className="p-4 space-y-2">
        <h3 className="text-sm font-medium text-gray-800">
          {product.brandName}
        </h3>
        <p className="text-xs text-gray-500">{product.productName}</p>
        <p className="text-xs text-gray-500 truncate">{product.description}</p>
        <div className="flex items-center space-x-2">
          <span className="text-lg font-bold text-gray-900">
            ₹{product.newPrice}
          </span>
          <span className="text-sm line-through text-gray-500">
            ₹{product.oldPrice}
          </span>
        </div>
        <button
          onClick={handleAddToCart}
          className={`w-full ${
            isInCart ? "bg-green-600" : "bg-indigo-600"
          } text-white text-sm font-medium py-2 rounded-lg hover:opacity-90 transition`}
        >
          {isInCart ? "Cart Added" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
};

export default Cards;
