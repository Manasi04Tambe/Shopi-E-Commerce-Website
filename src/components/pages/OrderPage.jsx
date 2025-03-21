import { useContext } from "react"
import { Link } from "react-router-dom"
import Navbar from "../Navbar"
import { CartContext } from "../../context/CartContext"
import { ShoppingBag, Calendar, ArrowLeft } from "lucide-react"

function OrdersPage() {
  const { orders } = useContext(CartContext)

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center mb-6">
            <Link to="/" className="text-gray-500 hover:text-black mr-4">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <h1 className="text-2xl font-medium">My Orders</h1>
          </div>

          {orders.length === 0 ? (
            <div className="text-center py-16 border rounded-lg">
              <ShoppingBag className="h-16 w-16 mx-auto text-gray-300 mb-4" />
              <h2 className="text-xl font-medium mb-2">No orders yet</h2>
              <p className="text-gray-500 mb-6">Nothing yet, add some products and check them out :)</p>
            </div>
          ) : (
            <div className="space-y-6">
              {orders.map((order) => (
                <div key={order.id} className="border rounded-lg p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Order #{order.id}</p>
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>{new Date(order.date).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default OrdersPage


