import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import { Outlet } from 'react-router-dom'
import { useAuthStore } from "../store/useAuthStore"

const MainLayout = () => {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  console.log({ authUser });

  return (
    <div className='px-4 pr-5 md:px-8 lg:px-16 xl:px-32 2xl:px-64'>
      <Navbar />
      <Outlet />
    </div>
  )
}

export default MainLayout