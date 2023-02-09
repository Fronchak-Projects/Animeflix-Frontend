import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router';
import {
  createRoutesFromElements,
  createBrowserRouter,
  Route
} from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import ErrorPage from './pages/ErrorPage';
import Root from './pages/Root';
import Home from './pages/Home';
import Animes from './pages/Animes';
import AnimeDetailsPage from './pages/AnimeDetailsPage';
import 'react-toastify/dist/ReactToastify.css';
import AdminRoot from './pages/AdminRoot';
import AdminIndex from './pages/AdminIndex';
import AdminAnimesList from './pages/AdminAnimesList';
import Auth from './pages/Auth';
import UserRegisterForm from './components/UserRegisterForm';
import LoginForm from './components/LoginForm';
import Logout from './pages/Logout';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={ <Root /> }
      errorElement={ <ErrorPage /> }
    >
      <Route element={ <Home /> } index />
      <Route path='animes' element={ <Animes /> } />
      <Route path="animes/:id" element={ <AnimeDetailsPage /> } />
      <Route
      path="admin"
      element={ <AdminRoot /> }
      >
        <Route element={ <AdminIndex /> } index />
        <Route path="animes" element={ <AdminAnimesList /> } />
      </Route>
      <Route
        path='auth'
        element={ <Auth /> }
      >
        <Route
          index
          element={ <UserRegisterForm /> }
        />
        <Route
          path='login'
          element={ <LoginForm /> }
        />
      </Route>
      <Route
        path='logout'
        element={ <Logout /> }
      />
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <ToastContainer
      theme='dark'
      position='bottom-right'
      autoClose={3000}
    />
  </React.StrictMode>,
)
