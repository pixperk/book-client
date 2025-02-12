"use client"

import type React from "react"
import { useState } from "react"
import { useUser } from "../context/userContext"

import { updateProfile } from "../queries/auth"
import { useMutation } from "@tanstack/react-query"
import toast from "react-hot-toast"
import { useNavigate } from "react-router"

export default function UpdateProfile() {
  const { user, loginUser } = useUser()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
  })
  const [isPreview, setIsPreview] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const { mutate: handleSubmit, isPending: isLoading } = useMutation({
    mutationFn: () => updateProfile(user?.id!, formData.name, formData.email),
    onSuccess: (data) => {
      loginUser({ id: user?.id!, name: data.user.name, email: data.user.email, token: user?.token! })
      toast.success("Profile updated successfully!")
      navigate("/profile")
    },
    onError: () => {
      toast.error("There was a problem while updating your profile. Try again later...")
    },
  })

  return (
    <div className="min-h-screen flex justify-center items-center px-4 bg-gray-900">
      <div className="w-full max-w-md border border-purple-700 rounded-lg shadow-lg p-6 bg-gray-800">
        <h1 className="text-2xl font-bold text-center text-purple-300 mb-6">
          {isPreview ? "Preview Profile" : "Update Profile"}
        </h1>
        {isPreview ? (
          <div className="space-y-4">
            <div className="flex justify-center">
              <div className="w-24 h-24 rounded-full bg-purple-600 flex items-center justify-center text-white text-3xl font-bold">
                {formData.name.charAt(0).toUpperCase()}
              </div>
            </div>
            <div className="text-center">
              <h2 className="text-xl font-semibold text-purple-200">{formData.name}</h2>
              <p className="text-pink-300">{formData.email}</p>
            </div>
            <div className="flex justify-between mt-6">
              <button
                onClick={() => setIsPreview(false)}
                className="px-4 py-2 border border-purple-500 rounded text-purple-300 hover:bg-purple-900 transition-colors"
              >
                ← Go Back
              </button>
              <button
                onClick={() => handleSubmit()}
                disabled={isLoading}
                className="px-4 py-2 bg-pink-600 rounded text-white hover:bg-pink-700 transition-colors disabled:opacity-50"
              >
                {isLoading ? "Saving..." : "Confirm Changes"}
              </button>
            </div>
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault()
              setIsPreview(true)
            }}
            className="space-y-4"
          >
            <div>
              <label className="block text-purple-300 font-medium mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-gray-700 border border-purple-600 rounded text-purple-200 focus:outline-none focus:ring-2 focus:ring-pink-500"
                required
              />
            </div>
            <div>
              <label className="block text-purple-300 font-medium mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-gray-700 border border-purple-600 rounded text-purple-200 focus:outline-none focus:ring-2 focus:ring-pink-500"
                required
              />
            </div>
            <div className="flex justify-between">
              <button
                type="button"
                onClick={() => navigate("/profile")}
                className="px-4 py-2 border border-purple-500 rounded text-purple-300 hover:bg-purple-900 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-pink-600 rounded text-white hover:bg-pink-700 transition-colors"
              >
                Preview Changes
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}

