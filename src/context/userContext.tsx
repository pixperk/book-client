"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"

interface User {
  id: string
  name: string
  email: string
  token: string
}

interface UserContextType {
  user: User | null
  loginUser: (userData: User) => void
  logoutUser: () => void
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)

 
  useEffect(() => {
    const storedUser = localStorage.getItem("book-user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [localStorage])


  const loginUser = (userData: User) => {
    setUser(userData)
    localStorage.setItem("book-user", JSON.stringify(userData))
    localStorage.setItem("book-token", userData.token)
  }


  const logoutUser = () => {
    setUser(null)
    localStorage.removeItem("book-user")
    localStorage.removeItem("book-token")
  }

  return (
    <UserContext.Provider value={{ user, loginUser, logoutUser }}>
      {children}
    </UserContext.Provider>
  )
}


export const useUser = (): UserContextType => {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error("useUser must be used within a UserProvider")
  }
  return context
}
