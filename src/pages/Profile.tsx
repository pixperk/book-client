import { User, Mail, BookOpen, Shield, Settings, ExternalLink } from "lucide-react"
import { useUser } from "../context/userContext"
import { useNavigate } from "react-router"
import { useState, useEffect } from "react"

function generateAvatar(name: string) {
  const canvas = document.createElement("canvas")
  const context = canvas.getContext("2d")
  canvas.width = 200
  canvas.height = 200

  if (context) {
    // Create gradient background
    const gradient = context.createLinearGradient(0, 0, canvas.width, canvas.height)
    gradient.addColorStop(0, `hsl(${(name.length * 10) % 360}, 70%, 45%)`)
    gradient.addColorStop(1, `hsl(${((name.length * 10) + 40) % 360}, 70%, 45%)`)
    context.fillStyle = gradient
    context.fillRect(0, 0, canvas.width, canvas.height)

    // Add a subtle pattern
    context.fillStyle = "rgba(255, 255, 255, 0.1)"
    for (let i = 0; i < 3; i++) {
      context.fillRect(0, (canvas.height / 3) * i, canvas.width, 2)
    }

    // Text with shadow
    context.shadowColor = "rgba(0, 0, 0, 0.3)"
    context.shadowBlur = 15
    context.font = "bold 100px Arial"
    context.fillStyle = "white"
    context.textAlign = "center"
    context.textBaseline = "middle"
    context.fillText(name.charAt(0).toUpperCase(), canvas.width / 2, canvas.height / 2)
  }

  return canvas.toDataURL()
}

export default function Profile() {
  const { user } = useUser()
  const navigate = useNavigate()
  const [isAdmin, setIsAdmin] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)

  useEffect(() => {
    const userRole = localStorage.getItem("book-user-role")
    setIsAdmin(userRole === "admin")
  }, [])

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold text-gray-300">Please log in to view your profile</h2>
          <button
            onClick={() => navigate("/login")}
            className="px-6 py-2 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-lg hover:from-pink-500 hover:to-purple-500 transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer"
          >
            Go to Login
          </button>
        </div>
      </div>
    )
  }

  const avatarUrl = generateAvatar(user.name)

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gray-800/50 backdrop-blur-sm shadow-2xl rounded-2xl p-8 border border-gray-700">
          {/* Header Section */}
          <div className="relative flex flex-col items-center mb-8">
            <div className="group relative">
              <img
                src={avatarUrl}
                alt={user.name}
                className="w-32 h-32 rounded-full border-4 border-pink-500/50 shadow-lg cursor-pointer transform transition-all duration-300 group-hover:scale-105 group-hover:border-pink-400"
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
              />
              {showTooltip && (
                <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-3 py-1 rounded-lg text-sm shadow-xl">
                  Generated avatar
                </div>
              )}
            </div>
            <h1 className="text-3xl font-bold mt-4 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">
              {user.name}'s Profile
            </h1>
            {isAdmin && (
              <div className="absolute top-0 right-0 flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/20 text-pink-400">
                <Shield className="w-4 h-4" />
                <span className="text-sm font-medium">Admin</span>
              </div>
            )}
          </div>

          {/* User Information */}
          <div className="space-y-6 mb-8">
            <div className="flex items-center p-4 bg-gray-700/30 rounded-xl cursor-default hover:bg-gray-700/40 transition-colors">
              <User className="w-6 h-6 text-pink-400 mr-3" />
              <div>
                <div className="text-sm text-gray-400">Name</div>
                <div className="text-gray-200 font-medium">{user.name}</div>
              </div>
            </div>

            <div className="flex items-center p-4 bg-gray-700/30 rounded-xl cursor-default hover:bg-gray-700/40 transition-colors">
              <Mail className="w-6 h-6 text-pink-400 mr-3" />
              <div>
                <div className="text-sm text-gray-400">Email</div>
                <div className="text-gray-200 font-medium">{user.email}</div>
              </div>
            </div>

            <div className="flex items-center p-4 bg-gray-700/30 rounded-xl cursor-default hover:bg-gray-700/40 transition-colors">
              <BookOpen className="w-6 h-6 text-pink-400 mr-3" />
              <div>
                <div className="text-sm text-gray-400">Reading Status</div>
                <div className="text-gray-200 font-medium">Active Reader</div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate("/update-profile")}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-xl font-semibold hover:from-pink-500 hover:to-purple-500 transition-all duration-300 transform hover:-translate-y-0.5 focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50 cursor-pointer group"
            >
              <Settings className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
              Update Profile
            </button>
            
            <button
              onClick={() => navigate("/books")}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-700 text-white rounded-xl font-semibold hover:bg-gray-600 transition-all duration-300 transform hover:-translate-y-0.5 focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 cursor-pointer group"
            >
              <ExternalLink className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              Browse Books
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}