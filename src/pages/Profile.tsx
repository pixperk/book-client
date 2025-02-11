"use client"


import { User } from "lucide-react"
import { useUser } from "../context/userContext"
import { useNavigate } from "react-router"

function generateAvatar(name: string) {
  const canvas = document.createElement("canvas")
  const context = canvas.getContext("2d")
  canvas.width = 200
  canvas.height = 200

  if (context) {
    // Background with a pinkish-purple hue
    context.fillStyle = `hsl(${(name.length * 10) % 360}, 50%, 40%)`
    context.fillRect(0, 0, canvas.width, canvas.height)

    // Text
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

  if (!user) {
    return <div className="text-center mt-10 text-gray-300">Please log in to view your profile.</div>
  }

  const avatarUrl = generateAvatar(user.name)

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen text-gray-300">
      <div className="bg-gray-800 shadow-lg rounded-lg p-8 max-w-2xl mx-auto border border-pink-600">
        <div className="flex items-center justify-center mb-6">
          <img
            src={avatarUrl || "/placeholder.svg"}
            alt={user.name}
            className="w-32 h-32 rounded-full border-4 border-pink-500 shadow-md"
          />
        </div>
        <h1 className="text-3xl font-bold text-center text-pink-400 mb-6">{user.name}'s Profile</h1>
        <div className="space-y-4">
          <div className="flex items-center">
            <User className="w-6 h-6 text-pink-400 mr-2" />
            <span className="text-gray-300">Name: {user.name}</span>
          </div>
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 text-pink-400 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            <span className="text-gray-300">Email: {user.email}</span>
          </div>
        </div>
       
        <div className="mt-6 text-center">
          <button
            onClick={() => navigate("/update-profile")}
            className="cursor-pointer bg-pink-600 hover:bg-pink-500 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition duration-300"
          >
            Update Profile
          </button>
        </div>
      </div>
    </div>
  )
}
