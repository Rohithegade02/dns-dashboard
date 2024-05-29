import { Navigate } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthProvider'
//Protected Route
const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext)

  return isAuthenticated ? children : <Navigate to='/login' replace />
}

export default PrivateRoute
