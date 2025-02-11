import axios from "axios"
import { token } from "./auth"

// Ensure VITE_API_URL is defined in .env
const API_URL = import.meta.env.VITE_API_URL

export interface Book {
  _id: string
  title: string
  author: string
  description: string
  user : {
    name : string
  }
  price: number
}

export interface BooksResponse {
  books: Book[]
  totalBooks: number
  totalPages: number
  currentPage: number
}

export interface Review {
  _id : string
  book : string
  user : {
    name : string
    email : string
  }
  review : string
  rating : number
}

export interface ReviewResponse {
  reviews : Review[]
}

export const getBooks = async (page = 1, limit = 10): Promise<BooksResponse> => {
  const response = await axios.get(`${API_URL}/books`, {
    params: { page, limit },
  })
  return response.data
}

export const addBooks = async (title : string, author : string, description : string,price : string) : Promise<Book> => {
 const response =  await axios.post(`${API_URL}/books`,{
    title, 
    author,
    description,
    price
  },{
    headers: {
      Authorization: `Bearer ${token}`, 
    },
  }
 )

 return response.data;
}

export const getBookDetails = async (bookId:string): Promise<Book> => {
  const response = await axios.get(`${API_URL}/books/${bookId}`)
  return response.data
}

export const getReviews = async (bookId:string): Promise<ReviewResponse> => {
  const response = await axios.get(`${API_URL}/reviews/${bookId}`)
  return response.data
}

export const addReview = async (bookId : string, rating : number, review : string) : Promise<Review> => {
  const response =  await axios.post(`${API_URL}/reviews/${bookId}`,{
    rating,
    review
   },{
     headers: {
       Authorization: `Bearer ${token}`, 
     },
   }
  )
 
  return response.data;
 }
