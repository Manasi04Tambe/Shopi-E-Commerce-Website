import { useContext } from "react"
import { X, Plus } from "lucide-react"
import { CartContext } from "../context/CartContext"

function ProductDetail({ product, onClose }) {
  const { addToCart } = useContext(CartContext)

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-2xl font-bold">{product.name}</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700" aria-label="Close">
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
              <img
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                className="h-full w-full object-cover"
              />
            </div>

            <div>
              <div className="mb-4">
                <span className="inline-block bg-gray-100 px-3 py-1 rounded-full text-sm font-medium mb-2">
                  {product.category}
                </span>
                <h3 className="text-3xl font-bold mb-2">{product.price}$</h3>
                <p className="text-gray-600">{product.description}</p>
              </div>

              <button
                onClick={() => {
                  addToCart(product)
                  onClose()
                }}
                className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center"
              >
                <Plus className="h-5 w-5 mr-2" />
                Add to cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail

