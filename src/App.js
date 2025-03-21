import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { CartProvider } from "./context/CartContext"
import Home from "./components/pages/Home"
import Checkout from "./components/pages/Checkout"
import OrdersPage from "./components/pages/OrderPage"
import AccountPage from "./components/pages/AccountPage"


function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/account" element={<AccountPage />} />
        </Routes>
      </Router>
    </CartProvider>
  )
}

export default App


