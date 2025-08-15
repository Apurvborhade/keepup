"use client"

import AxiosInstance from "@/lib/axios"
import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"

interface User {
  id: string
  username: string
  email: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  registerInit: (username: string, email: string, password: string) => Promise<{ success: boolean, message?: string, error?: string }>
  verifyOtp: (username: string, email: string, password: string, otp: string) => Promise<{ success: boolean, message?: string, error?: string }>
  logout: () => void
  updateUser: (userData: Partial<User>) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Check for existing session on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data } = await AxiosInstance.get('/auth/me');
        console.log('Check Auth User: ', data)
        setUser(data.user)
      } catch (error) {
        console.log("Error checking auth:", error)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  const login = async (email: string, password: string): Promise<{ success: boolean; message?: string; error?: string }> => {

    const res = await AxiosInstance.post('/auth/login', {
      email,
      password
    })


    setUser(res.data.user)

    return { success: true, message: res.data };

  }

  const registerInit = async (
    username: string,
    email: string,
    password: string,
  ): Promise<{ success: boolean; message?: string; error?: string }> => {
    try {
      const res = await AxiosInstance.post('/auth/register-init', {
        username,
        email,
        password
      })

      console.log("Register Init: ", res)
      return { success: true, message: res.data };

    } catch (error: any) {
      console.log(error)
      return { success: false, error: error.data }
    }
  }
  const verifyOtp = async (
    username: string,
    email: string,
    password: string,
    otp: string
  ): Promise<{ success: boolean; message?: string; error?: string }> => {
    try {
      const { data } = await AxiosInstance.post('/auth/verify-otp', {
        username,
        email,
        password,
        otp
      })


      if (data) {
        setUser(data.user)
        return { success: true, message: data as string }
      } else {
        return { success: false, error: data.error }
      }

    } catch (error: any) {
      return { success: false, error: error.data.message }
    }
  }

  const logout = async () => {
    try {
      const { data } = await AxiosInstance.post('/auth/logout')
      if (data) {
        setUser(null)
        return { success: true, message: data as string }
      } else {
        return { success: false, error: data.error }
      }
    } catch (error: any) {
      return { success: false, error: error.data.message }
    }
  }

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData }
      setUser(updatedUser)
      localStorage.setItem("pinger_user", JSON.stringify(updatedUser))
    }
  }

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    registerInit,
    verifyOtp,
    logout,
    updateUser,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
