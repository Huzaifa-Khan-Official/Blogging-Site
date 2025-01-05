import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './routes/HomePage.jsx'
import PostListPage from './routes/PostListPage.jsx'
import Write from './routes/Write.jsx'
import LoginPage from './routes/LoginPage.jsx'
import RegisterPage from './routes/RegisterPage.jsx'
import SinglePostPage from './routes/SinglePostPage.jsx'
import MainLayout from './layouts/MainLayout.jsx'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from 'react-toastify';
import ProtectedRoute from './components/ProtectedRoute.jsx'
import SavedPostsPage from './routes/SavedPostsPage.jsx'
import MyPostsPage from './routes/MyPostsPage.jsx'
import Update from './routes/Update.jsx'
import NotFound from './routes/NotFound.jsx'

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/posts",
        element: <PostListPage />
      },
      {
        path: "/saved-posts",
        element: (
          <ProtectedRoute>
            <SavedPostsPage />
          </ProtectedRoute>
        )
      },
      {
        path: "/my-posts",
        element: (
          <ProtectedRoute>
            <MyPostsPage />
          </ProtectedRoute>
        )
      },
      {
        path: "/:slug",
        element: <SinglePostPage />
      },
      {
        path: "/write",
        element: (
          <ProtectedRoute>
            <Write />
          </ProtectedRoute>
        )
      },
      {
        path: "/write/:slug",
        element: (
          <ProtectedRoute>
            <Update />
          </ProtectedRoute>
        )
      },
      {
        path: "/login",
        element: <LoginPage />
      },
      {
        path: "/register",
        element: <RegisterPage />
      },
      {
        path: "*",
        element: <NotFound />
      },
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ToastContainer position='bottom-right' autoClose={2000} />
    </QueryClientProvider>
  </StrictMode>,
)
