import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { BookOpen, ArrowLeft, ArrowRight, DollarSign } from "lucide-react";
import { addBooks } from "../queries/books";

export default function ListBooks() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    description: "",
    price: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = e.target.name === "price" 
      ? e.target.value.replace(/[^0-9.]/g, "").replace(/(\..*)\./g, "$1")
      : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const { mutate: handleSubmit, isPending: isLoading } = useMutation({
    mutationFn: () => addBooks(
      formData.title,
      formData.author,
      formData.description,
      parseFloat(formData.price)
    ),
    onSuccess: () => {
      toast.success("Book listed successfully!");
      navigate("/books");
    },
    onError: () => {
      toast.error("You can add a book only if you are an admin");
    }
  });

  const isFormValid = () => {
    return (
      formData.title.trim() !== "" &&
      formData.author.trim() !== "" &&
      formData.description.trim() !== "" &&
      formData.price !== "" &&
      parseFloat(formData.price) > 0
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 py-12 px-4">

      
      <div className="max-w-2xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            <span className="text-gray-400">Fill Details</span>
            <span className="text-gray-400">Review</span>
          </div>
          <div className="h-2 bg-gray-700 rounded-full">
            <div 
              className="h-full bg-gradient-to-r from-pink-500 to-purple-500 rounded-full transition-all duration-300"
              style={{ width: step === 1 ? "50%" : "100%" }}
            />
          </div>
        </div>

        <div className="bg-gray-800 rounded-2xl shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-pink-600 to-purple-600 p-1">
            <div className="bg-gray-800 p-8">
              <div className="flex items-center justify-center mb-6">
                <BookOpen className="w-8 h-8 text-pink-500 mr-2" />
                <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">
                  {step === 1 ? "List Your Book" : "Review Details"}
                </h1>
              </div>

              {step === 1 ? (
                <form onSubmit={(e) => { e.preventDefault(); setStep(2) }} className="space-y-6">
                  <div>
                    <label className="block text-pink-400 font-medium mb-2">Title</label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      placeholder="Enter book title"
                      className="w-full px-4 py-3 rounded-xl bg-gray-900 border border-gray-700 text-gray-200 placeholder-gray-500 focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-pink-400 font-medium mb-2">Author</label>
                    <input
                      type="text"
                      name="author"
                      value={formData.author}
                      onChange={handleChange}
                      placeholder="Enter author name"
                      className="w-full px-4 py-3 rounded-xl bg-gray-900 border border-gray-700 text-gray-200 placeholder-gray-500 focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-pink-400 font-medium mb-2">Description</label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      placeholder="Enter book description"
                      rows={4}
                      className="w-full px-4 py-3 rounded-xl bg-gray-900 border border-gray-700 text-gray-200 placeholder-gray-500 focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200 resize-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-pink-400 font-medium mb-2">Price</label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
                      <input
                        type="text"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        placeholder="0.00"
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-900 border border-gray-700 text-gray-200 placeholder-gray-500 focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200"
                        required
                      />
                    </div>
                  </div>
                  <div className="flex justify-between pt-4">
                    <button
                      type="button"
                      onClick={() => navigate("/books")}
                      className="flex items-center px-6 py-3 border border-gray-700 rounded-xl text-gray-300 hover:bg-gray-700 transition-all duration-200 transform hover:-translate-y-1"
                    >
                      <ArrowLeft className="mr-2" size={20} />
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={!isFormValid()}
                      className="flex items-center px-6 py-3 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-xl font-semibold hover:from-pink-500 hover:to-purple-500 transition-all duration-200 transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:transform-none"
                    >
                      Review
                      <ArrowRight className="ml-2" size={20} />
                    </button>
                  </div>
                </form>
              ) : (
                <div className="space-y-6">
                  <div className="space-y-4 bg-gray-900 p-6 rounded-xl border border-gray-700">
                    <div className="flex justify-between items-center pb-2 border-b border-gray-700">
                      <span className="text-pink-400 font-medium">Title</span>
                      <span className="text-gray-200">{formData.title}</span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b border-gray-700">
                      <span className="text-pink-400 font-medium">Author</span>
                      <span className="text-gray-200">{formData.author}</span>
                    </div>
                    <div className="pb-2 border-b border-gray-700">
                      <span className="text-pink-400 font-medium block mb-2">Description</span>
                      <p className="text-gray-200">{formData.description}</p>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-pink-400 font-medium">Price</span>
                      <span className="text-gray-200 font-bold">${parseFloat(formData.price).toFixed(2)}</span>
                    </div>
                  </div>
                  <div className="flex justify-between pt-4">
                    <button
                      onClick={() => setStep(1)}
                      className="flex items-center px-6 py-3 border border-gray-700 rounded-xl text-gray-300 hover:bg-gray-700 transition-all duration-200 transform hover:-translate-y-1"
                    >
                      <ArrowLeft className="mr-2" size={20} />
                      Edit
                    </button>
                    <button
                      onClick={() => handleSubmit()}
                      disabled={isLoading}
                      className="flex items-center px-6 py-3 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-xl font-semibold hover:from-pink-500 hover:to-purple-500 transition-all duration-200 transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:transform-none"
                    >
                      {isLoading ? "Submitting..." : "Submit"}
                      {!isLoading && <ArrowRight className="ml-2" size={20} />}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}