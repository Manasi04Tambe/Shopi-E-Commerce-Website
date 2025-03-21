import { createContext, useState } from "react"

export const CartContext = createContext({
  cartItems: [],
  orders: [],
  addToCart: () => {},
  removeFromCart: () => {},
  increaseQuantity: () => {},
  decreaseQuantity: () => {},
  checkout: () => {},
})

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([])
  const [orders, setOrders] = useState([])

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id)

      if (existingItem) {
        return prevItems.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item))
      }

      return [...prevItems, { ...product, quantity: 1 }]
    })
  }

  const removeFromCart = (productId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId))
  }

  const increaseQuantity = (productId) => {
    setCartItems((prevItems) =>
      prevItems.map((item) => (item.id === productId ? { ...item, quantity: item.quantity + 1 } : item)),
    )
  }

  const decreaseQuantity = (productId) => {
    setCartItems((prevItems) => {
      const item = prevItems.find((item) => item.id === productId)

      if (item && item.quantity === 1) {
        return prevItems.filter((item) => item.id !== productId)
      }

      return prevItems.map((item) => (item.id === productId ? { ...item, quantity: item.quantity - 1 } : item))
    })
  }

  // Checkout function to move cart items to orders
  const checkout = () => {
    if (cartItems.length > 0) {
      setOrders([...orders, { id: new Date().getTime(), date: new Date(), items: cartItems }])
      setCartItems([]) // Clear cart after checkout
    }
  }

  return (
    <CartContext.Provider
      value={{
        cartItems,
        orders,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        checkout,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}


