import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import Navbar from "../Navbar"
import { fetchUsers } from "../data/products"
import { ArrowLeft, User, Mail, Phone, MapPin, Camera } from "lucide-react"

function AccountPage() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getUser = async () => {
      setLoading(true)
      const users = await fetchUsers()
      // For demonstration, we'll use the first user from the API
      if (users.length > 0) {
        setUser(users[0])
      }
      setLoading(false)
    }

    getUser()
  }, [])

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-6">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center mb-6">
            <Link to="/" className="text-gray-500 hover:text-black mr-4">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <h1 className="text-2xl font-medium">My Account</h1>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <p>Loading account information...</p>
            </div>
          ) : user ? (
            <div className="bg-white rounded-lg border overflow-hidden">
              <div className="bg-gray-100 p-6 relative">
                <div className="flex flex-col items-center">
                  <div className="relative">
                    <div className="h-24 w-24 rounded-full overflow-hidden bg-gray-200 border-4 border-white">
                      <img
                        src={user.avatar || "https://ui-avatars.com/api/?name=" + encodeURIComponent(user.name)}
                        alt={user.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <button className="absolute bottom-0 right-0 bg-black text-white p-1.5 rounded-full">
                      <Camera className="h-4 w-4" />
                    </button>
                  </div>
                  <h2 className="text-xl font-medium mt-4">{user.name}</h2>
                  <p className="text-gray-500">{user.role || "Customer"}</p>
                </div>
              </div>

              <div className="p-6 space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Personal Information</h3>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <User className="h-5 w-5 text-gray-400 mt-0.5 mr-3" />
                      <div>
                        <p className="text-sm text-gray-500">Full Name</p>
                        <p>{user.name}</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Mail className="h-5 w-5 text-gray-400 mt-0.5 mr-3" />
                      <div>
                        <p className="text-sm text-gray-500">Email</p>
                        <p>{user.email}</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Phone className="h-5 w-5 text-gray-400 mt-0.5 mr-3" />
                      <div>
                        <p className="text-sm text-gray-500">Phone</p>
                        <p>{user.phone || "+1 (555) 123-4567"}</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <MapPin className="h-5 w-5 text-gray-400 mt-0.5 mr-3" />
                      <div>
                        <p className="text-sm text-gray-500">Address</p>
                        <p>{user.address || "123 Main St, Anytown, USA"}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* <div className="pt-4 border-t">
                  <button className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition-colors">
                    Edit Profile
                  </button>
                </div> */}
              </div>
            </div>
          ) : (
            <div className="text-center py-16 border rounded-lg">
              <User className="h-16 w-16 mx-auto text-gray-300 mb-4" />
              <h2 className="text-xl font-medium mb-2">User not found</h2>
              <p className="text-gray-500 mb-6">We couldn't load your account information.</p>
              <button
                onClick={() => window.location.reload()}
                className="inline-block bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors"
              >
                Try Again
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default AccountPage

