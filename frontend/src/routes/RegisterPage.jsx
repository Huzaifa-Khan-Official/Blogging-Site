import { SignUp } from '@clerk/clerk-react'
import React from 'react'

const RegisterPage = () => {
  return (
    <div className='flex items-center justify-center min-h-[calc(100vh-80px)] py-6'>
      <SignUp signInUrl='/login' />
    </div>
  )
}

export default RegisterPage