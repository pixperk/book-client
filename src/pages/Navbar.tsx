"use client"


import { LogOut, LogIn, UserPlus, BookOpen, User } from "lucide-react"
import { useUser } from "../context/userContext"
import { Link } from "react-router"

const Navbar = () => {
  const { user, logoutUser } = useUser()

  return (
    <nav className="bg-gradient-to-r from-purple-900 via-indigo-800 to-pink-800 shadow-lg py-4 px-6 flex justify-between items-center text-white">
      <Link to="/" className="flex items-center gap-2 text-2xl font-bold hover:text-pink-300 transition-colors">
        <BookOpen className="h-7 w-7 text-pink-300" /> LumineReads
      </Link>

      <div className="flex items-center gap-4">
        {user ? (
          <div className="flex items-center gap-4">
            <Link to="/profile" className="flex items-center gap-2 text-white hover:text-pink-300 transition-colors">
              <User className="h-5 w-5" /> Profile
            </Link>
            <button
              onClick={logoutUser}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-700 hover:bg-indigo-600 transition-colors"
            >
              <LogOut className="h-5 w-5" /> Logout
            </button>
          </div>
        ) : (
          <div className="flex gap-4">
            <Link
              to="/login"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-700 hover:bg-indigo-600 transition-colors"
            >
              <LogIn className="h-5 w-5" /> Login
            </Link>
            <Link
              to="/signup"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-pink-600 hover:bg-pink-500 transition-colors"
            >
              <UserPlus className="h-5 w-5" /> Sign Up
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar

