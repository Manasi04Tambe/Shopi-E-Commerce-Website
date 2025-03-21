import { useState } from "react"
import Navbar from "../Navbar"
import ProductGrid from "../Product-grid"
import CartSidebar from "../CartSidebar"

function Home() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("All")
  const [isCartOpen, setIsCartOpen] = useState(false)

  const handleCategoryChange = (category) => {
    setActiveCategory(category)
  }

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar activeCategory={activeCategory} onCategoryChange={handleCategoryChange} toggleCart={toggleCart} />
      <main className="flex-1 container mx-auto px-4 py-6">
        <h1 className="text-center text-2xl font-medium mb-6">Home</h1>
        <div className="max-w-md mx-auto mb-8">
          <input
            type="text"
            placeholder="Search a product"
            className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <ProductGrid category={activeCategory} searchQuery={searchQuery} />
      </main>
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  )
}

export default Home



