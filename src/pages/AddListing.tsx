"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useMutation } from "@tanstack/react-query"

import toast, { Toaster } from "react-hot-toast"
import { addBooks } from "../queries/books"

export default function ListBooks() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1) // Step 1: Fill, Step 2: Review
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    description: "",
    price: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const { mutate: handleSubmit, isPending: isLoading } = useMutation({
    mutationFn: () => addBooks(formData.title, formData.author, formData.description, formData.price),
    onSuccess: () => {
      toast.success("Book listed successfully!")
      navigate("/books") // Redirect after success
    },
    onError: () => {
      toast.error("Access denied")
    }
  })

  return (
    <div className="min-h-screen flex justify-center items-center px-4">
      <Toaster position="top-right" reverseOrder={false} />
      
      <div className="w-full max-w-md border border-gray-700 shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold text-center text-gray-300 mb-4">
          {step === 1 ? "List a Book" : "Review Details"}
        </h1>

        {step === 1 ? (
          // Step 1: Fill Form
          <form onSubmit={(e) => { e.preventDefault(); setStep(2) }} className="space-y-4">
            <div>
              <label className="block text-gray-400 font-medium mb-1">Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-gray-900 text-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-500 cursor-pointer"
                required
              />
            </div>
            <div>
              <label className="block text-gray-400 font-medium mb-1">Author</label>
              <input
                type="text"
                name="author"
                value={formData.author}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-gray-900 text-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-500 cursor-pointer"
                required
              />
            </div>
            <div>
              <label className="block text-gray-400 font-medium mb-1">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-gray-900 text-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-500 cursor-pointer"
                required
              />
            </div>
            <div>
              <label className="block text-gray-400 font-medium mb-1">Price</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-gray-900 text-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-500 cursor-pointer"
                required
              />
            </div>
            <div className="flex justify-between">
              <button
                type="button"
                onClick={() => navigate("/books")}
                className="px-4 py-2 border border-gray-500 rounded-lg text-gray-300 hover:bg-gray-800 transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-500 transition cursor-pointer"
              >
                Review
              </button>
            </div>
          </form>
        ) : (
          // Step 2: Review Form
          <div className="space-y-4">
            <div>
              <p className="text-gray-400"><strong>Title:</strong> {formData.title}</p>
              <p className="text-gray-400"><strong>Author:</strong> {formData.author}</p>
              <p className="text-gray-400"><strong>Description:</strong> {formData.description}</p>
              <p className="text-gray-400"><strong>Price:</strong> ${formData.price}</p>
            </div>
            <div className="flex justify-between">
              <button
                onClick={() => setStep(1)}
                className="px-4 py-2 border border-gray-500 rounded-lg text-gray-300 hover:bg-gray-800 transition cursor-pointer"
              >
                Edit
              </button>
              <button
                onClick={() => handleSubmit()}
                disabled={isLoading}
                className="px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-500 transition cursor-pointer"
              >
                {isLoading ? "Submitting..." : "Submit"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
