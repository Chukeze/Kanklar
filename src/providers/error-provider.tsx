"use client"
import React, { createContext, useContext, useState, ReactNode } from 'react'

interface ErrorContextProps {
  error: string | null
  showError: (message: string) => void
}

const ErrorContext = createContext<ErrorContextProps | undefined>(undefined)

interface ErrorProviderProps {
  children: ReactNode
}

export const ErrorProvider: React.FC<ErrorProviderProps> = ({ children }) => {
  const [error, setError] = useState<string | null>(null)

  const showError = (message: string) => {
    setError(message)
    setTimeout(() => setError(null), 5000) // Hide error after 5 seconds
  }

  return (
    <ErrorContext.Provider value={{ error, showError }}>
      {children}
    </ErrorContext.Provider>
  )
}

export const useError = (): ErrorContextProps => {
  const context = useContext(ErrorContext)
  if (context === undefined) {
    throw new Error('useError must be used within an ErrorProvider')
  }
  return context
}
