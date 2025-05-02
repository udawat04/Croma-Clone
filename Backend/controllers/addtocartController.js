const AddToCart = require("../models/addtocartModel");

const addToCart = async (req, res) => {
  try {
    const { userId, product, quantity = 1 } = req.body;

    const existingItem = await AddToCart.findOne({
      userId,
      "product._id": product._id,
    });

    if (existingItem) {
      existingItem.quantity += quantity;
      await existingItem.save();
      return res
        .status(200)
        .json({ success: true, message: "Cart updated", cart: existingItem });
    }

    const newCartItem = await AddToCart.create({ userId, product, quantity });
    res
      .status(201)
      .json({
        success: true,
        message: "Item added to cart",
        cart: newCartItem,
      });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Failed to add to cart",
        error: error.message,
      });
  }
};

const getCartByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const cartItems = await AddToCart.find({ userId });
    res.status(200).json({ success: true, cart: cartItems });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Failed to fetch cart",
        error: error.message,
      });
  }
};

const updateCart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    const cartItem = await AddToCart.findOne({
      userId,
      "product._id": productId,
    });

    if (!cartItem) {
      return res
        .status(404)
        .json({ success: false, message: "Cart item not found" });
    }

    cartItem.quantity = quantity;
    await cartItem.save();

    res
      .status(200)
      .json({ success: true, message: "Cart updated", cart: cartItem });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Failed to update cart",
        error: error.message,
      });
  }
};

const removeFromCart = async (req, res) => {
  try {
    const { userId, productId } = req.params;

    const deleted = await AddToCart.findOneAndDelete({
      userId,
      "product._id": productId,
    });

    if (!deleted) {
      return res
        .status(404)
        .json({ success: false, message: "Item not found in cart" });
    }

    res.status(200).json({ success: true, message: "Item removed from cart" });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Failed to remove item",
        error: error.message,
      });
  }
};

module.exports = {
  addToCart,
  getCartByUser,
  updateCart,
  removeFromCart,
};
