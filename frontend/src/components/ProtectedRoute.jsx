import { Navigate } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthProvider'

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext)
  console.log(isAuthenticated)
  return isAuthenticated ? children : <Navigate to='/login' replace />
}

export default PrivateRoute