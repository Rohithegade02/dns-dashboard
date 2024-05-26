import { BrowserRouter, Route, Routes } from 'react-router-dom'
// import DnsForm from './components/DnsForm'
// import DomainChart from './components/DomainChart'
// import PrivateRoute from './components/PrivateROute'
import SignUp from './components/SignUp'
import Login from './components/Login'
import { useEffect } from 'react'
import { isAuth } from './api/user'

function App() {
  useEffect(() => {
    isAuth()
  }, [])
  isAuth()
  return (
    <div className='max-w-[100vw]'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<SignUp />} />
          <Route path='/login' element={<Login />} />
          {/* Private route only can be accessed when authenticated */}
          {/* <Route
            path='/todo'
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <DnsForm />
              </PrivateRoute>
            }
          />
          {/* Redirect to login if not authenticated */}
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
