import { BrowserRouter, Route, Routes } from 'react-router-dom'
// import DnsForm from './components/DnsForm'
// import DomainChart from './components/DomainChart'

import SignUp from './components/SignUp'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import DomainDashboard from './components/DomainDashboard'

function App() {
  // useEffect(() => {
  //   isAuth()
  // }, [])
  // isAuth()
  return (
    <div className='max-w-[100vw]'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<SignUp />} />
          <Route path='/login' element={<Login />} />
          <Route path='/dns' element={<DomainDashboard />} />
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
