import { SignIn } from '@clerk/clerk-react'
import React from 'react'

const LoginPage = () => {
  return (
    <div className='flex items-center justify-center py-4 min-h-[calc(100vh-80px)]'>
      <SignIn signUpUrl='/register'/>
    </div>
  )
}

export default LoginPage