export async function fetchProducts() {
    try {
      const response = await fetch("https://api.escuelajs.co/api/v1/products")
      const data = await response.json()
  
      // Transform the API data to match your product structure
      return data.map((product) => ({
        id: product.id,
        name: product.title,
        description: product.description,
        price: product.price,
        image: product.images[0],
        category: product.category?.name || "Uncategorized",
      }))
    } catch (error) {
      console.error("Error fetching products:", error)
      return []
    }
  }
  
  export async function fetchCategories() {
    try {
      const response = await fetch("https://api.escuelajs.co/api/v1/categories")
      const data = await response.json()
  
      // Return category names
      return ["All", ...data.map((category) => category.name)]
    } catch (error) {
      console.error("Error fetching categories:", error)
      return ["All", "Clothes", "Electronics", "Furnitures", "Toys"] // Fallback to original categories
    }
  }
  
  export async function fetchUsers() {
    try {
      const response = await fetch("https://api.escuelajs.co/api/v1/users")
      const data = await response.json()
      return data
    } catch (error) {
      console.error("Error fetching users:", error)
      return []
    }
  }
  
  
  