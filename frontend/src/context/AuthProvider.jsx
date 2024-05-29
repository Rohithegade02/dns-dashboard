import { createContext, useState, useEffect } from 'react'

const AuthContext = createContext()

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem('token'),
  )

  useEffect(() => {
    const handleStorageChange = () => {
      setIsAuthenticated(!!localStorage.getItem('token'))
    }

    window.addEventListener('storage', handleStorageChange)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [])

  const login = token => {
    localStorage.setItem('token', token) //setting token in login content
    setIsAuthenticated(true)
  }

  const logout = () => {
    localStorage.removeItem('token') //removing token in login content
    setIsAuthenticated(false)
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthProvider }
