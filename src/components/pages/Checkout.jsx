import React, { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { ArrowLeft } from "lucide-react"
import { CartContext } from "../../context/CartContext"

function Checkout() {
  const { cartItems, checkout } = useContext(CartContext)
  const navigate = useNavigate()

  React.useEffect(() => {
    if (cartItems.length === 0) {
      navigate("/")
    }
  }, [cartItems, navigate])

  const handleCheckout = () => {
    checkout()
    navigate("/orders") // Navigate to the orders page after checkout
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white rounded-lg shadow-md max-w-md w-full">
        <div className="p-4 flex items-center justify-between border-b">
          <button onClick={() => navigate("/")} className="p-2 rounded-full hover:bg-gray-100" aria-label="Go back">
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h1 className="text-xl font-medium">My Order</h1>
          <div className="w-5"></div>
        </div>

        <div className="p-6">
          {cartItems.map((item) => (
            <div key={item.id} className="flex items-center gap-4 py-4 border-b">
              <div className="h-20 w-20 bg-gray-200 rounded-md overflow-hidden">
                <img src={item.image || "/placeholder.svg"} alt={item.name} className="h-full w-full object-cover" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium">{item.name}</h3>
                <p className="text-xl font-bold mt-1">${item.price}</p>
              </div>
              <div className="bg-gray-200 px-3 py-1 rounded-md">{item.quantity}</div>
            </div>
          ))}

          <div className="mt-6">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-medium">Total:</span>
              <span className="text-xl font-bold">
                ${cartItems.reduce((total, item) => total + item.price * item.quantity, 0)}
              </span>
            </div>

            <button onClick={handleCheckout} className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition-colors">
              Proceed to Payment
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout


