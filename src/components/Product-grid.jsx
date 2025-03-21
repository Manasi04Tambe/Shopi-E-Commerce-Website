import { useState, useEffect } from "react"
import ProductCard from "../components/Product-card"
import ProductDetail from "../components/ProductDetails"
import { fetchProducts } from "../components/data/products"

function ProductGrid({ category, searchQuery }) {
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true)
      const productsData = await fetchProducts()
      setProducts(productsData)
      setLoading(false)
    }

    getProducts()
  }, [])

  const filteredProducts = products.filter((product) => {
    const matchesCategory = category === "All" || product.category === category
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  if (loading) {
    return <div className="flex justify-center items-center py-20">Loading products...</div>
  }

  return (
    <div>
      {selectedProduct && <ProductDetail product={selectedProduct} onClose={() => setSelectedProduct(null)} />}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-500">No products found matching your criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} onProductClick={() => setSelectedProduct(product)} />
          ))}
        </div>
      )}
    </div>
  )
}

export default ProductGrid



