import { useMutation, useQuery } from "@tanstack/react-query";
import { Star } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { addReview, getBookDetails, getReviews } from "../queries/books";

export default function BookDetails() {
  const { bookId: id } = useParams();
  const navigate = useNavigate();

  const { data: book, isLoading } = useQuery({
    queryKey: ["book", id],
    queryFn: () => getBookDetails(id!),
  });

  const { data: reviews, isLoading: reviewsLoading } = useQuery({
    queryKey: ["reviews", id],
    queryFn: () => getReviews(id!),
  });

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const { mutate: submitReview, isPending } = useMutation({
    mutationFn: () => addReview(id!, rating, comment),
    onSuccess: () => {
      toast.success("Review added successfully!");
      setComment("");
      setRating(5);
    },
    onError: () => {
      toast.error("Failed to add review!");
    }
  });

  if (isLoading || reviewsLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex justify-center items-center">
        <div className="animate-pulse text-pink-500 text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Book Details Card */}
        <div className="bg-gray-800 rounded-2xl shadow-2xl overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-pink-600 to-purple-600 p-1">
            <div className="bg-gray-800 p-8">
              <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500 mb-4">
                {book?.title}
              </h1>
              <div className="space-y-4">
                <p className="text-gray-300"><span className="text-pink-400 font-semibold">Author:</span> {book?.author}</p>
                <p className="text-gray-300"><span className="text-pink-400 font-semibold">Description:</span> {book?.description}</p>
                <p className="text-gray-300">
                  <span className="text-pink-400 font-semibold">Price:</span>
                  <span className="text-purple-400 font-bold text-xl ml-2">${book?.price}</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Review Form */}
        <div className="bg-gray-800 rounded-2xl shadow-2xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500 mb-6">
            Leave a Review
          </h2>

          <div className="flex gap-3 mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={28}
                className={`cursor-pointer transition-all duration-200 ${
                  star <= rating
                    ? "fill-yellow-400 stroke-yellow-400"
                    : "stroke-gray-500"
                } hover:scale-110`}
                onClick={() => setRating(star)}
              />
            ))}
          </div>

          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={4}
            placeholder="Share your thoughts about this book..."
            className="w-full px-4 py-3 rounded-xl bg-gray-900 border border-gray-700 text-gray-200 placeholder-gray-500 focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200 resize-none"
          />

          <button
          
            onClick={() => submitReview()}
            disabled={isPending}
            className="cursor-pointer mt-4 w-full bg-gradient-to-r from-pink-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:from-pink-500 hover:to-purple-500 transition-all duration-200 transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:transform-none"
          >
            {isPending ? "Submitting..." : "Submit Review"}
          </button>
        </div>

        {/* Reviews Section */}
        <div className="bg-gray-800 rounded-2xl shadow-2xl p-8">
          <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500 mb-6">
            Reviews
          </h2>

          <div className="space-y-6">
            {reviews?.reviews && reviews.reviews.length > 0 ? (
              reviews.reviews.map((review) => (
                <div
                  key={review._id}
                  className="border border-gray-700 rounded-xl p-4 hover:border-pink-500 transition-all duration-200"
                >
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-pink-400 font-semibold">{review.user.name}</p>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          size={16}
                          className={star <= review.rating ? "fill-yellow-400 stroke-yellow-400" : "stroke-gray-500"}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-300">{review.review}</p>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">No reviews yet. Be the first to review!</p>
              </div>
            )}
          </div>
        </div>

        <button
          onClick={() => navigate("/books")}
          className="cursor-pointer mt-8 w-full bg-gray-800 text-white py-3 rounded-xl font-semibold hover:bg-gray-700 transition-all duration-200 transform hover:-translate-y-1"
        >
          Back to Books
        </button>
      </div>
    </div>
  );
}
