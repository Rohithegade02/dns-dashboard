import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SignUp from './components/SignUp'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import DomainDashboard from './components/DomainDashboard'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
function App() {
  const token = localStorage.getItem('token')

  return (
    <div className='max-w-[100vw]'>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path='/signup' element={<SignUp />} />

          <Route path='/login' element={<Login />} />
          <Route path='/' element={<DomainDashboard />} />
          <Route path='/domain' element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
{
  /* <Route
            path='/'
            element={
              !isAuthenticated ? <Navigate to='/login' replace /> : <DnsForm />
            }
          /> */
}
