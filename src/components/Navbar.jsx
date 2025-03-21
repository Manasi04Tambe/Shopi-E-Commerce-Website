import { useContext, useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { ShoppingCart, Menu, X } from "lucide-react"
import { CartContext } from "../context/CartContext"
import { fetchCategories } from "./data/products"

function Navbar({ activeCategory, onCategoryChange, toggleCart }) {
  const { cartItems } = useContext(CartContext)
  const [categories, setCategories] = useState(["All", "Clothes", "Electronics", "Furnitures", "Toys"])
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const getCategories = async () => {
      const categoriesData = await fetchCategories()
      setCategories(categoriesData)
    }
    getCategories()
  }, [])

  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0)

  return (
    <header className="border-b border-gray-200 bg-white shadow-md">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between py-4">
          
          {/* Logo */}
          <Link to="/" className="text-xl font-bold">
            Shopi
          </Link>

          {/* Navigation Links (Hidden on Mobile) */}
          <nav className="hidden md:flex space-x-6">
            {categories.map((category) => (
              <button
                key={category}
                className={`${
                  activeCategory === category ? "text-black font-medium" : "text-gray-500 hover:text-black"
                }`}
                onClick={() => onCategoryChange(category)}
              >
                {category}
              </button>
            ))}
          </nav>

          {/* User Actions (Hidden on Mobile) */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/orders" className="hover:text-gray-700">
              My Orders
            </Link>
            <Link to="/account" className="hover:text-gray-700">
              My Account
            </Link>
            <button className="relative" onClick={toggleCart} aria-label="Open cart">
              <ShoppingCart className="h-6 w-6" />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen ? "block" : "hidden"
          }`}
        >
          <nav className="flex flex-col items-center space-y-4 pb-4">
            {categories.map((category) => (
              <button
                key={category}
                className={`${
                  activeCategory === category ? "text-black font-medium" : "text-gray-500 hover:text-black"
                }`}
                onClick={() => {
                  onCategoryChange(category)
                  setIsMobileMenuOpen(false) // Close menu after selection
                }}
              >
                {category}
              </button>
            ))}
            <Link to="/orders" className="hover:text-gray-700" onClick={() => setIsMobileMenuOpen(false)}>
              My Orders
            </Link>
            <Link to="/account" className="hover:text-gray-700" onClick={() => setIsMobileMenuOpen(false)}>
              My Account
            </Link>
            <button className="relative" onClick={toggleCart} aria-label="Open cart">
              <ShoppingCart className="h-6 w-6" />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </button>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Navbar
