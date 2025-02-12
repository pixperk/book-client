"use client"

import type React from "react"
import { useState } from "react"
import { Lock, Mail, Loader2 } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { useMutation } from "@tanstack/react-query"
import { login } from "../queries/auth"
import { useUser } from "../context/userContext"
import toast from "react-hot-toast"

const Login: React.FC = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { loginUser } = useUser()
  const navigate = useNavigate()

  const { mutate: handleSubmit, isPending: isLoading, error } = useMutation({
    mutationFn: () => login(email, password),
    onSuccess: (data) => {
      loginUser({ id: data.user._id, name: data.user.name, email: data.user.email, token: data.token })
      toast.success("Login successful!")
      navigate("/books")
    },
    onError : ()=>{
      toast.error("Login Unsuccessful")
    }
  })

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-gray-800 p-6">
      <div className="bg-gray-800 p-8 rounded-xl shadow-2xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
          Welcome Back!
        </h2>
        <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
              Email
            </label>
            <div className="relative">
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 pl-10"
                placeholder="you@example.com"
              />
              <Mail className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
            </div>
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 pl-10"
                placeholder="••••••••"
              />
              <Lock className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
            </div>
          </div>
          {error && <p className="text-red-500 text-sm">{error.message}</p>}
          <button
            type="submit"
            disabled={isLoading}
            className="cursor-pointer w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg px-4 py-3 font-semibold transition duration-300 ease-in-out hover:from-purple-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
          >
            {isLoading ? <Loader2 className="animate-spin mx-auto h-5 w-5" /> : "Sign In"}
          </button>
        </form>
        <p className="mt-6 text-center text-gray-400">
          Don't have an account?{" "}
          <Link to="/register" className="text-purple-400 hover:text-purple-300 font-semibold">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login
