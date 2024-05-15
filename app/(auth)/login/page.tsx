import LoginForm from '@/components/auth/loginComp/LoginForm'
import React from 'react'

const Login = () => {
  return (
    <div className='w-full flex justify-center items-center min-h-full h-full mt-12'>
        <LoginForm locale='en' />
    </div>
  )
}

export default Login