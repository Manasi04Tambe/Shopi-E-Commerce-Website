import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { X, Plus, Minus } from "lucide-react"
import { CartContext } from "../context/CartContext"

function CartSidebar({ isOpen, onClose }) {
  const { cartItems, removeFromCart, increaseQuantity, decreaseQuantity } = useContext(CartContext)
  const navigate = useNavigate()

  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)

  const handleCheckout = () => {
    onClose()
    navigate("/checkout")
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/30" onClick={onClose}></div>
      <div className="absolute top-0 right-0 h-full w-full max-w-md bg-white shadow-xl flex flex-col">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-bold">My Order</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700" aria-label="Close cart">
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="flex-1 overflow-auto p-4">
          {cartItems.length === 0 ? (
            <p className="text-center text-gray-500 my-8">Your cart is empty</p>
          ) : (
            <ul className="space-y-4">
              {cartItems.map((item) => (
                <li key={item.id} className="flex items-start gap-4 py-4 border-b">
                  <div className="relative h-16 w-16 flex-shrink-0 bg-gray-100 rounded-md overflow-hidden">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium">{item.name}</h3>
                    <p className="text-lg font-bold mt-1">${item.price}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => decreaseQuantity(item.id)}
                      className="h-6 w-6 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="h-3 w-3" />
                    </button>
                    <span className="w-6 text-center">{item.quantity}</span>
                    <button
                      onClick={() => increaseQuantity(item.id)}
                      className="h-6 w-6 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300"
                      aria-label="Increase quantity"
                    >
                      <Plus className="h-3 w-3" />
                    </button>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-gray-400 hover:text-gray-600"
                    aria-label="Remove item"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="p-4 border-t">
          <div className="flex justify-between items-center mb-4">
            <span className="text-lg font-medium">Total:</span>
            <span className="text-xl font-bold">${totalPrice}</span>
          </div>
          <button
            className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition-colors"
            onClick={handleCheckout}
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  )
}

export default CartSidebar



