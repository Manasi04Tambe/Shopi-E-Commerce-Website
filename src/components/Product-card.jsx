import { useContext } from "react"
import { Plus } from "lucide-react"
import { CartContext } from "../context/CartContext"

function ProductCard({ product, onProductClick }) {
  const { addToCart } = useContext(CartContext)

  const handleAddToCart = (e) => {
    e.stopPropagation()
    addToCart(product)
  }

  return (
    <div className="group cursor-pointer" onClick={onProductClick}>
      <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-200 mb-3">
        <img
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          className="h-full w-full object-cover transition-transform group-hover:scale-105"
        />
        <button
          className="absolute top-2 right-2 bg-white rounded-full p-1.5 shadow-md hover:bg-gray-100 transition-colors z-10"
          onClick={handleAddToCart}
          aria-label="Add to cart"
        >
          <Plus className="h-5 w-5" />
        </button>
        <div className="absolute bottom-0 left-0 bg-white/80 backdrop-blur-sm px-2 py-1">
          <span className="text-sm font-medium">{product.category}</span>
        </div>
      </div>
      <h3 className="font-medium text-sm">{product.name}</h3>
      <div className="flex justify-between items-center mt-1">
        <span className="text-gray-700">{product.price}$</span>
      </div>
    </div>
  )
}

export default ProductCard

