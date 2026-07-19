"use server"

/**
 * Legacy shim — cart server actions now live in the vercel commerce adapter.
 * Client components keep importing from here until they migrate.
 */
export {
  addToCart,
  updateCartItemQuantity,
  removeCartItem,
  getCart,
  getCartSummary,
  placeOrder,
} from "@/commerce/vercel/cart"
