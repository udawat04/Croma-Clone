import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ProductCard = (props) => {
  const [isInCart, setIsInCart] = useState(false);
  const userData = JSON.parse(localStorage.getItem("UserData"));
  const userId = userData?._id;

  useEffect(() => {
    const storedCartIds =
      JSON.parse(localStorage.getItem("cartProductIds")) || [];
    setIsInCart(storedCartIds.includes(String(props.id))); // Compare as string
  }, [props.id]);

  const handleAddToCart = async () => {
    if (!userId) {
      alert("Please login first");
      return;
    }

    const payload = {
      userId,
      product: {
        _id: props.id,
        name: props.productName,
        price: props.newPrice,
        image: props.image,
        category: props.type,
      },
      quantity: 1,
    };

    try {
      let cartProductIds =
        JSON.parse(localStorage.getItem("cartProductIds")) || [];

      if (isInCart) {
        // Remove from cart
        const res = await fetch(
          `http://localhost:4000/user/${userId}/product/${props.id}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const data = await res.json();
        if (data.success) {
          const updatedIds = cartProductIds.filter(
            (id) => id !== String(props.id)
          );
          localStorage.setItem("cartProductIds", JSON.stringify(updatedIds));
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
          cartProductIds.push(String(props.id));
          localStorage.setItem(
            "cartProductIds",
            JSON.stringify(cartProductIds)
          );
          setIsInCart(true);
          alert("Added to cart successfully");
        } else {
          alert(data.message || "Something went wrong");
        }
      }
    } catch (error) {
      alert("Failed to modify cart: " + error.message);
    }
  };

  return (
    <div className="w-[250px] bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 mb-8">
      <Link to="/product">
        <img
          className="w-full h-48 object-contain"
          src={props.image}
          alt="Product"
        />
      </Link>
      <div className="p-4 space-y-2">
        <h4>{props.id}</h4>
        <p className="text-gray-600 text-xs">
          {props.brandName} - {props.type}
        </p>
        <h2 className="text-base font-semibold text-gray-800">
          {props.productName}
        </h2>
        <p className="text-gray-600 text-xs whitespace-nowrap overflow-hidden text-ellipsis">
          {props.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-sm font-bold text-gray-900">
            ${props.newPrice}
          </span>
          <button
            className={`${
              isInCart ? "bg-green-600" : "bg-indigo-600"
            } text-white text-xs font-medium px-3 cursor-pointer py-1.5 rounded-lg hover:opacity-90 transition`}
            onClick={handleAddToCart}
          >
            {isInCart ? "Cart Added" : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
