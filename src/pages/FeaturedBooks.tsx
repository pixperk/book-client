"use client"

import { useQuery } from "@tanstack/react-query"
import { getBooks } from "../queries/books"
import { useNavigate } from "react-router"


export default function FeaturedBooks() {
  const { data : booksList, isLoading, error } = useQuery({
    queryKey: ["topBooks"],
    queryFn: () => getBooks(1,3),
  })

    const navigate = useNavigate()
 

  if (isLoading) return <p className="text-gray-300">Loading books...</p>
  if (error) return <p className="text-red-500">Error fetching books</p>

  const {books} = booksList!
   
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {books.map((book) => (
        <div
          key={book._id}
          className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-700"
        >
          <h3 className="text-xl font-semibold text-purple-400 mb-2">{book.title}</h3>
          <p className="text-gray-400 mb-2">by {book.author}</p>
          <p className="text-sm text-gray-500 mb-4">Shared by {book.user.name}</p>
          <p className="text-gray-300 mb-4">{book.description}</p>
          <button onClick={()=>navigate(`/books/${book._id}`)}
           className="cursor-pointer w-full bg-purple-600 hover:bg-purple-500 text-white font-semibold py-2 px-4 rounded transition-colors">
            Read More
          </button>
        </div>
      ))}
    </div>
  )
}
