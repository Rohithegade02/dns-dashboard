import { Button, TextField } from '@mui/material'
import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { loginUser } from '../api/user'
import { toast } from 'react-toastify'
import { AuthContext } from '../context/AuthProvider'

const Login = () => {
  const { login } = useContext(AuthContext)
  const navigate = useNavigate()
  const [user, setUser] = useState({
    email: '',
    password: '',
  })
  const [emailError, setEmailError] = useState({
    //email error
    status: false,
    message: '',
  })
  const [passwordError, setPasswordError] = useState({
    // password error
    status: false,
    message: '',
  })
  const [error, setError] = useState('') //throws error when on invalid crentionals

  const handleChange = e => {
    const value = e.target.value
    const name = e.target.name
    setUser({ ...user, [name]: value })
    if (name === 'email' && value.trim() !== '') {
      setEmailError({
        status: false,
        message: '',
      })
    } else if (name === 'password' && value.trim() !== '') {
      setPasswordError({
        status: false,
        message: '',
      })
    }
  }
  const handleSubmit = async e => {
    e.preventDefault()

    setEmailError({
      status: false,
      message: '',
    })
    setPasswordError({
      status: false,
      message: '',
    })
    if (!user.email) {
      setEmailError({
        status: true,
        message: 'Email is required',
      })
      return
    } else if (!user.password) {
      setPasswordError({
        status: true,
        message: 'Password is required',
      })
      return
    }
    const res = await loginUser(user)

    if (res.success) {
      login(res.token)
      navigate('/')
      toast.success(res.message)
    } else {
      toast.error(res.message)
    }
  }

  return (
    <div className=''>
      <form
        onSubmit={handleSubmit}
        className='flex justify-center h-[100vh] flex-col items-center gap-5  p-5'
      >
        <p className='text-[20px] font-bold'>Login</p>

        <div>
          <TextField
            label='Email'
            name='email'
            type='email'
            value={user.email}
            onChange={handleChange}
            placeholder='Email'
            error={emailError.status}
            helperText={emailError.message}
            sx={{
              width: '60vw',
              '@media (min-width: 600px)': { width: '30vw' },
              '@media (max-width: 1024px)': { width: '50vw' },
            }}
          />
        </div>
        <div>
          <TextField
            label='Password'
            name='password'
            type='password'
            value={user.password}
            onChange={handleChange}
            placeholder='password'
            error={passwordError.status}
            helperText={passwordError.message}
            sx={{
              width: '60vw',
              '@media (min-width: 600px)': { width: '30vw' },
              '@media (max-width: 1024px)': { width: '50vw' },
            }}
          />
        </div>
        <p className='text-[#cc0000]'>{error} </p>
        <Button
          type='submit'
          sx={{
            background: '#2196F3',
            color: 'white',
            textTransform: 'none',
            width: '60vw',
            '@media (min-width: 600px)': { width: '30vw' },
            '@media (max-width: 1024px)': { width: '50vw' },
            '&:hover': {
              backgroundColor: '#2196F3',
            },
          }}
        >
          Login
        </Button>
        <div>
          <p>
            Don&apos;t have an account?{' '}
            <span
              onClick={() => navigate('/signup')}
              className='text-[#2196f3] cursor-pointer underline-offset-1'
            >
              Create
            </span>
          </p>
        </div>
      </form>
    </div>
  )
}

export default Login
