import React, { useState } from 'react'
import Image from '../components/Image'
import { Link } from 'react-router-dom'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6'
import { useForm } from 'react-hook-form'
import { useAuthStore } from '../store/useAuthStore'
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import app from '../configuration/firebase.config'

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { login, isLoggingIn, googleSignup } = useAuthStore();
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = (data) => {
    login(data);
  };

  const handleGoogleBtnClick = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;

        const data = {
          username: user.displayName,
          email: user.email,
          isVerified: user.emailVerified,
        };

        googleSignup(data);
      }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
      });
  };

  return (
    <div className='flex items-center justify-center min-h-[calc(100vh-80px)]'>
      <div className="my-6 flex items-center pb-6 flex-col bg-gray-50 rounded-2xl justify-center">
        <div className="w-full sm:w-96 bg-white rounded-2xl shadow-lg p-8">
          {/* Header */}
          <div className="text-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Sign in to Blog</h2>
            <p className="text-gray-500 mt-1 text-sm text-center">
              Welcome back! Please sign in <br /> to continue
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Email Input */}
            <div className="mb-6">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email address
              </label>
              <input
                type="text"
                id="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent placeholder-gray-400 text-sm"
                placeholder="Enter email"
                {
                ...register("email", {
                  required: {
                    value: true,
                    message: "Please enter your email address"
                  }
                })
                }
              />

              <p className="text-red-500 text-xs italic mt-2">{errors.email_or_username && errors.email_or_username.message}</p>
            </div>

            {/* Password Input */}
            <div className="mb-2 relative">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent placeholder-gray-400 text-sm"
                placeholder="Enter your password"
                {...register("password", {
                  required: {
                    value: true,
                    message: "Please enter a password"
                  },
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters long"
                  },
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
                    message: "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
                  }
                })}
              />
              <div className='absolute bottom-[10px] right-4 cursor-pointer hover:scale-105' onClick={handleShowPassword}>
                {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
              </div>
            </div>
            <p className="text-red-500 text-xs italic mb-4 w-full break-words">{errors.password && errors.password.message}</p>


            {/* Continue Button */}
            <button className="w-full bg-gray-900 text-white rounded-lg py-2 px-4 hover:bg-gray-800 transition-colors flex items-center justify-center" type='submit'>
              <span>Continue</span>
              {
                isLoggingIn ? (
                  <div role="status">
                    <svg aria-hidden="true" class="w-5 h-5 ml-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                      <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                    </svg>
                  </div>
                ) : (
                  <span className="ml-2">
                    →
                  </span>
                )
              }
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-gray-500">or</span>
            </div>
          </div>

          {/* Social Login Buttons */}
          <div className="flex items-center gap-3 mb-2">
            {/* Apple Button
            <button className="flex justify-center items-center w-full h-10 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.07-.5-2.04-.48-3.16 0-1.4.62-2.13.53-3.01-.38C2.79 15.15 3.51 7.84 9.05 7.58c1.35.07 2.29.74 3.08.78 1.18-.23 2.32-.94 3.53-.84 1.96.17 3.32.94 4.05 2.38-3.65 2.21-3.07 6.62.35 8.37-.86 1.64-1.97 3.27-3.01 4.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
              </svg>
            </button>

            Facebook Button
            <button className="flex justify-center items-center w-full h-10 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <svg className="w-5 h-5 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385h-3.047v-3.47h3.047v-2.642c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953h-1.514c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385c5.737-.9 10.125-5.864 10.125-11.854z" />
              </svg>
            </button> */}

            {/* Google Button */}
            <button className="flex justify-center items-center w-full h-10 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              onClick={handleGoogleBtnClick}
            >
              <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 48 48">
                <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
              </svg>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            Don't have an account?{' '}
            <Link to="/register" className="text-gray-900 hover:underline">
              Sign up
            </Link>
          </p>

          {/* Branding */}
          <div className="mt-6 flex flex-col items-center space-y-1">
            <div className="flex items-center space-x-1 text-xs text-gray-500">
              <span>Secured by</span>
              <Image src="logo.png" alt="logo" w={15} h={15} />
              <span>Blogging Site</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage