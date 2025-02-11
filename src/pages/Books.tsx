"use client"

import { useQuery } from "@tanstack/react-query"
import debounce from "lodash.debounce"
import { AlertTriangle, BookOpen, ChevronLeft, ChevronRight, DollarSign, Loader2, Search, User } from "lucide-react"
import type React from "react"
import { useCallback, useMemo, useState } from "react"
import { useNavigate } from "react-router"
import { type Book, getBooks } from "../queries/books"

const Books: React.FC = () => {
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState("")
  const [priceSort, setPriceSort] = useState<"asc" | "desc" | "">("")
  const [priceRange, setPriceRange] = useState<{ min: number; max: number }>({ min: 0, max: 1000 })
  const [selectedAuthor, setSelectedAuthor] = useState<string>("")
  const [selectedUser, setSelectedUser] = useState<string>("")
  const limit = 12
  const navigate = useNavigate()

  const { data, isLoading, isError } = useQuery({
    queryKey: ["books", page],
    queryFn: () => getBooks(page, limit),
  })

  const debouncedSearch = useCallback(
    debounce((value: string) => setSearch(value), 300),
    [],
  )

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(e.target.value)
  }

  const filteredAndSortedBooks = useMemo(() => {
    if (!data?.books) return []

    return data.books
      .filter(
        (book: Book) =>
          book.title.toLowerCase().includes(search.toLowerCase()) ||
          book.author.toLowerCase().includes(search.toLowerCase()),
      )
      .filter(
        (book: Book) =>
          (!selectedAuthor || book.author === selectedAuthor) &&
          (!selectedUser || book.user.name === selectedUser) &&
          book.price >= priceRange.min &&
          book.price <= priceRange.max,
      )
      .sort((a: Book, b: Book) => {
        if (priceSort === "asc") return a.price - b.price
        if (priceSort === "desc") return b.price - a.price
        return 0
      })
  }, [data?.books, search, selectedAuthor, selectedUser, priceRange, priceSort])

  const uniqueAuthors = useMemo(
    () => Array.from(new Set(data?.books.map((book: Book) => book.author) || [])),
    [data?.books],
  )

  const uniqueUsers = useMemo(
    () => Array.from(new Set(data?.books.map((book: Book) => book.user.name) || [])),
    [data?.books],
  )

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-screen text-xl font-semibold text-gray-300 bg-gray-900">
        <Loader2 className="animate-spin w-8 h-8 mr-3" />
        <span className="animate-pulse">Loading your literary adventure...</span>
      </div>
    )

  if (isError)
    return (
      <div className="flex flex-col items-center justify-center h-screen text-xl font-semibold text-red-400 bg-gray-900">
        <AlertTriangle className="w-16 h-16 mb-4" />
        <p>Oops! It seems our bookshelf stumbled.</p>
        <p className="text-base text-gray-400 mt-2">Please try again later.</p>
      </div>
    )

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white p-8">
      <h1 className="text-5xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
       Bookworm's Paradise
      </h1>

      <div className="mb-8 flex flex-wrap gap-4 items-center justify-between">
        <div className="relative flex-grow max-w-md">
          <input
            type="text"
            placeholder="Search books..."
            onChange={handleSearchChange}
            className="w-full px-4 py-2 bg-gray-700 text-white rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 pl-10"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>

        <div className="flex gap-4 flex-wrap">
          <select
            onChange={(e) => setPriceSort(e.target.value as "asc" | "desc" | "")}
            className="bg-gray-700 text-white rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="">Sort by Price</option>
            <option value="asc">Price: Low to High</option>
            <option value="desc">Price: High to Low</option>
          </select>

          <select
            onChange={(e) => setSelectedAuthor(e.target.value)}
            className="bg-gray-700 text-white rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="">Filter by Author</option>
            {uniqueAuthors.map((author) => (
              <option key={author} value={author}>
                {author}
              </option>
            ))}
          </select>

          <select
            onChange={(e) => setSelectedUser(e.target.value)}
            className="bg-gray-700 text-white rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="">Filter by User</option>
            {uniqueUsers.map((user) => (
              <option key={user} value={user}>
                {user}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mb-8 flex items-center gap-4">
        <span className="text-gray-300">Price Range:</span>
        <input
          type="number"
          value={priceRange.min}
          onChange={(e) => setPriceRange((prev) => ({ ...prev, min: Number(e.target.value) }))}
          className="w-24 px-2 py-1 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
          placeholder="Min"
        />
        <span>-</span>
        <input
          type="number"
          value={priceRange.max}
          onChange={(e) => setPriceRange((prev) => ({ ...prev, max: Number(e.target.value) }))}
          className="w-24 px-2 py-1 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
          placeholder="Max"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
      >
        {filteredAndSortedBooks.length ? (
          filteredAndSortedBooks.map((book: Book) => (
            <div
              key={book._id}
              onClick={()=>navigate(`/books/${book._id}`)}
              className="cursor-pointer bg-gray-800 p-6 rounded-xl shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-105 border border-gray-700 flex flex-col justify-between"
            >
              <div>
                <h3 className="text-xl font-semibold flex items-center gap-2 mb-3">
                  <BookOpen className="w-6 h-6 text-purple-400" />
                  {book.title}
                </h3>
                <p className="text-gray-300 flex items-center gap-2 mb-4">
                  <User className="w-5 h-5 text-pink-400" />
                  {book.author}
                </p>
                <p className="text-gray-400 text-sm mb-2">
                  Listed By <span className="text-gray-300 font-medium">{book.user.name}</span>
                </p>
                <p className="text-sm text-gray-400 mb-4 line-clamp-3">{book.description}</p>
              </div>
              <p className="text-yellow-300 flex items-center gap-2 font-medium text-lg">
                <DollarSign className="w-5 h-5" />
                {book.price.toFixed(2)}
              </p>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-400 text-xl">No books found matching your criteria.</p>
        )}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center gap-6 mt-12">
        <button
          onClick={() => setPage((old) => Math.max(old - 1, 1))}
          disabled={page === 1}
          className="px-6 py-3 bg-purple-600 hover:bg-purple-500 text-white rounded-full disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center"
        >
          <ChevronLeft className="w-5 h-5 mr-2" />
          Previous
        </button>

        <span className="text-gray-300 text-lg font-medium">
          Page {page} of {data?.totalPages || 1}
        </span>

        <button
          onClick={() => setPage((old) => (data?.totalPages && old < data.totalPages ? old + 1 : old))}
          disabled={!data?.totalPages || page === data.totalPages}
          className="px-6 py-3 bg-pink-600 hover:bg-pink-500 text-white rounded-full disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center"
        >
          Next
          <ChevronRight className="w-5 h-5 ml-2" />
        </button>
      </div>
    </div>
  )
}

export default Books

