"use client"

import { useState } from "react"
import { useUser } from "../context/userContext"
import { useNavigate } from "react-router-dom" // Fixed: It should be from react-router-dom
import { updateProfile } from "../queries/auth"
import { useMutation } from "@tanstack/react-query"
import toast from "react-hot-toast"

export default function UpdateProfile() {
  const { user, loginUser } = useUser()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const { mutate: handleSubmit, isPending: isLoading } = useMutation({
    mutationFn: () => updateProfile(user?.id!, formData.name, formData.email),
    onSuccess: (data) => {
      console.log(data);
      
      loginUser({ id: user?.id!, name: data.user.name, email: data.user.email, token: user?.token! })
      toast.success("Update successful!")
      navigate("/profile")
    },
    onError : (error) => {
      toast.error(error.message)
    }
  })

  return (
    <div className="min-h-screen flex justify-center items-center px-4">
      <div className="w-full max-w-md border border-gray-700 shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold text-center text-gray-300 mb-4">Update Profile</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            handleSubmit()
          }}
          className="space-y-4"
        >
          <div>
            <label className="block text-gray-400 font-medium mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-gray-900 text-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>
          <div>
            <label className="block text-gray-400 font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-gray-900 text-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>
          <div className="flex justify-between">
            <button
              type="button"
              disabled={isLoading}
              onClick={() => navigate("/profile")}
              className="cursor-pointer px-4 py-2 border border-gray-500 rounded-lg text-gray-300 hover:bg-gray-800 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="cursor-pointer px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-500 transition"
            >
              {isLoading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
