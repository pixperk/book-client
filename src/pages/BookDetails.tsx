"use client"

import { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useMutation, useQuery } from "@tanstack/react-query"

import toast from "react-hot-toast"
import { FaStar } from "react-icons/fa"
import { addReview, getBookDetails, getReviews } from "../queries/books"

export default function BookDetails() {
  const { bookId: id } = useParams()
  const navigate = useNavigate()

  const { data: book, isLoading } = useQuery({
    queryKey: ["book", id],
    queryFn: () => getBookDetails(id!),
  })

  const { data: reviews, isLoading: reviewsLoading } = useQuery({
    queryKey: ["reviews", id],
    queryFn: () => getReviews(id!),
  })

  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState("")

  const { mutate: submitReview, isPending } = useMutation({
    mutationFn: () => addReview(id!, rating, comment),
    onSuccess: () => {
      toast.success("Review added successfully!")
      setComment("")
      setRating(5)
    },
    onError: () => {
      toast.error("Failed to add review!")
    }
  })

  if (isLoading) return <div className="text-center text-gray-400">Loading book details...</div>
  if (reviewsLoading) return <div className="text-center text-gray-400">Loading reviews...</div>

  return (
    <div className="min-h-screen flex justify-center items-center px-4">
      <div className="w-full max-w-lg border border-gray-700 shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold text-center text-gray-300 mb-4">{book?.title}</h1>

        <p className="text-gray-400"><strong>Author:</strong> {book?.author}</p>
        <p className="text-gray-400"><strong>Description:</strong> {book?.description}</p>
        <p className="text-gray-400"><strong>Price:</strong> ${book?.price}</p>

        {/* Review Form */}
        <div className="mt-6 border-t border-gray-600 pt-4">
          <h2 className="text-xl font-semibold text-gray-300 mb-2">Leave a Review</h2>

          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <FaStar
                key={star}
                size={24}
                className={`cursor-pointer transition ${
                  star <= rating ? "text-yellow-400" : "text-gray-500"
                }`}
                onClick={() => setRating(star)}
              />
            ))}
          </div>

          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={3}
            placeholder="Write your review..."
            className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-gray-900 text-gray-200 focus:ring-2 focus:ring-pink-500 mt-3"
          />

          <button
            onClick={() => submitReview()}
            disabled={isPending}
            className="mt-3 w-full bg-pink-600 text-white py-2 rounded-lg hover:bg-pink-500 transition"
          >
            {isPending ? "Submitting..." : "Submit Review"}
          </button>
        </div>

        {/* Display Reviews */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold text-gray-300 mb-2">Reviews</h2>

          {reviews?.reviews && reviews.reviews.length > 0 ? (
            reviews.reviews.map((review) => (
              <div key={review._id} className="border-b border-gray-600 py-3">
                <p className="text-gray-300 font-semibold">{review.user.name}</p>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FaStar
                      key={star}
                      size={16}
                      className={star <= review.rating ? "text-yellow-400" : "text-gray-500"}
                    />
                  ))}
                </div>
                <p className="text-gray-400">{review.review}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No reviews yet.</p>
          )}
        </div>

        <button
          onClick={() => navigate("/books")}
          className="mt-6 w-full bg-gray-700 text-white py-2 rounded-lg hover:bg-gray-600 transition"
        >
          Back to Books
        </button>
      </div>
    </div>
  )
}
