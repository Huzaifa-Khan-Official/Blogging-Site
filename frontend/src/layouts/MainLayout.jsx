import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useAuthStore } from "../store/useAuthStore"

const MainLayout = () => {
  const { authUser, checkAuth } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (authUser && (location.pathname === "/login" || location.pathname === "/register")) {
    navigate("/");
  }
  
  return (
    <div className='px-4 pr-5 md:px-8 lg:px-16 xl:px-32 2xl:px-64'>
      <Navbar />
      <Outlet />
    </div>
  )
}

export default MainLayout