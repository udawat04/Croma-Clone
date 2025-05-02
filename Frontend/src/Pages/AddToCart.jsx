import React, { useEffect, useState } from "react";

const AddToCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totals, setTotals] = useState({
    subtotal: 0,
    shipping: 99,
    tax: 0,
    total: 0,
  });

  const user = JSON.parse(localStorage.getItem("UserData"));
  const userId = user?._id;

  // Fetch cart items once
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const res = await fetch(`http://localhost:4000/user/${userId}`);
        const data = await res.json();

        console.log("Fetched user data:", data);

        const cart = data.cart || [];
        setCartItems(cart);
      } catch (err) {
        console.error("Error fetching cart items:", err);
      }
    };

    if (userId) fetchCartItems();
  }, [userId]);

  // Recalculate totals when cartItems change
  useEffect(() => {
    if (cartItems.length === 0) return;

    const subtotal = cartItems.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
    const tax = Math.round(subtotal * 0.18); // 18% tax
    const total = subtotal + tax + 99;

    setTotals({ subtotal, shipping: 99, tax, total });
  }, [cartItems]);

  // Handle quantity change
  const handleQuantityChange = async (productId, delta) => {
    const updatedCart = cartItems.map((item) => {
      if (item.product._id === productId) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    });

    setCartItems(updatedCart);

    await fetch(`http://localhost:4000/updatecart`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, productId, delta }),
    });
  };

  // Handle remove
  const handleRemove = async (productId) => {
    try {
      const res = await fetch(
        `http://localhost:4000/user/${userId}/product/${productId}`,
        {
          method: "DELETE",
        }
      );

      const data = await res.json();
      if (data.success) {
        const updatedCart = cartItems.filter(
          (item) => item.product._id !== productId
        );
        setCartItems(updatedCart);

        // Update localStorage cartProductIds
        const cartProductIds =
          JSON.parse(localStorage.getItem("cartProductIds")) || [];
        const newCartIds = cartProductIds.filter((id) => id !== productId);
        if (newCartIds.length === 0) {
          localStorage.removeItem("cartProductIds");
        } else {
          localStorage.setItem("cartProductIds", JSON.stringify(newCartIds));
        }
      }
    } catch (err) {
      console.error("Error removing item:", err);
    }
  };

  return (
    <section className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Your Shopping Cart
        </h2>

        {/* Cart Items */}
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          cartItems.map((item) => (
            <div
              key={item.product._id}
              className="bg-white shadow rounded-lg p-6 mb-6"
            >
              <div className="flex flex-col md:flex-row items-center md:items-start md:space-x-6">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-32 h-32 object-cover rounded-md mb-4 md:mb-0"
                />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {item.product.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {item.product.category}
                  </p>
                  <div className="mt-4 flex items-center space-x-4">
                    <div className="flex items-center border border-gray-300 rounded">
                      <button
                        className="px-2 py-1 cursor-pointer text-gray-600 hover:text-indigo-600"
                        onClick={() =>
                          handleQuantityChange(item.product._id, -1)
                        }
                        disabled={item.quantity === 1}
                      >
                        −
                      </button>
                      <span className="px-4">{item.quantity}</span>
                      <button
                        className="px-2 py-1 text-gray-600 cursor-pointer hover:text-indigo-600"
                        onClick={() =>
                          handleQuantityChange(item.product._id, 1)
                        }
                      >
                        +
                      </button>
                    </div>
                    <span className="text-lg font-bold text-gray-900">
                      ₹{item.product.price * item.quantity}
                    </span>
                  </div>
                </div>
                <button
                  className="mt-4 md:mt-0 text-red-500 cursor-pointer hover:underline"
                  onClick={() => handleRemove(item.product._id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))
        )}

        {/* Order Summary */}
        {cartItems.length > 0 && (
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Order Summary
            </h3>
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Subtotal</span>
              <span>₹{totals.subtotal}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Shipping</span>
              <span>₹{totals.shipping}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-600 mb-4">
              <span>Tax (18%)</span>
              <span>₹{totals.tax}</span>
            </div>
            <div className="flex justify-between text-lg font-bold text-gray-900 border-t pt-4">
              <span>Total</span>
              <span>₹{totals.total}</span>
            </div>
            <button className="mt-6 w-full cursor-pointer bg-indigo-600 text-white py-3 rounded-lg text-sm font-medium hover:bg-indigo-700 transition">
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default AddToCart;
