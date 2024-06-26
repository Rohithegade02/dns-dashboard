import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import PrivateRoute from './components/ProtectedRoute'
import { AuthProvider } from './context/AuthProvider'
import DomainDashboard from './pages/DomainDashboard'
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import DNSDashboard from './pages/DnsDashboard'

function App() {
  return (
    <AuthProvider>
      <div className='max-w-[100vw]'>
        <ToastContainer />
        <BrowserRouter>
          <Routes>
            <Route path='/signup' element={<SignUp />} />
            <Route path='/login' element={<Login />} />
            <Route
              path='/'
              element={
                <PrivateRoute>
                  <DomainDashboard />
                </PrivateRoute>
              }
            />
            <Route
              path='/dns'
              element={
                <PrivateRoute>
                  <DNSDashboard />
                </PrivateRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </div>
    </AuthProvider>
  )
}

export default App
