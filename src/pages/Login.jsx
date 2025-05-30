import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { registerUser, loginUser } from '../services/AuthService'

const Login = () => {
  const [state, setState] = useState('Sign Up')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')


  const navigate = useNavigate()
  const { backendUrl, setToken, setUserData } = useContext(AppContext)

  const onSubmitHandler = async (event) => {
    event.preventDefault()

    let data
    if (state === 'Sign Up') {
      data = await registerUser(backendUrl, name, email, password)
    } else {
      data = await loginUser(backendUrl, email, password)
    }

    if (data.message==="Login successful") {
      console.log(data)
      // Save token and user
      // localStorage.setItem('token', data.token)
      // localStorage.setItem('user', JSON.stringify(data.user))
      setToken(data.token)
      setUserData(data.user)

      toast.success('Login successful!')

      // Redirect based on role
      const role = data.user.role
      if (role === 'doctor') {
        navigate('/dashboard-medecin')
      } else if (role === 'admin') {
        navigate('/dashboard-admin')
      } else {
        navigate('/')
      }
    } else {
      toast.error(data.message || 'Something went wrong')
    }
  }

  return (
    <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center'>
      <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg'>
        <p className='text-2xl font-semibold'>
          {state === 'Sign Up' ? 'Create Account' : 'Login'}
        </p>

        {state === 'Sign Up' && (
          <div className='w-full'>
            <p>Full Name</p>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              className='border border-[#DADADA] rounded w-full p-2 mt-1'
              type='text'
              required
            />
          </div>
        )}

        <div className='w-full'>
          <p>Email</p>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className='border border-[#DADADA] rounded w-full p-2 mt-1'
            type='email'
            required
          />
        </div>

        <div className='w-full'>
          <p>Password</p>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className='border border-[#DADADA] rounded w-full p-2 mt-1'
            type='password'
            required
          />
        </div>

        <button className='bg-blue-400 text-white w-full py-2 my-2 rounded-md text-base'>
          {state === 'Sign Up' ? 'Create account' : 'Login'}
        </button>

        {state === 'Sign Up' ? (
          <p>
            Already have an account?{' '}
            <span
              onClick={() => setState('Login')}
              className='text-primary underline cursor-pointer'
            >
              Login here
            </span>
          </p>
        ) : (
          <p>
            Create a new account?{' '}
            <span
              onClick={() => setState('Sign Up')}
              className='text-primary underline cursor-pointer'
            >
              Click here
            </span>
          </p>
        )}
      </div>
    </form>
  )
}

export default Login
