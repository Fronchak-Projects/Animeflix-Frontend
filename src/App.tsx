import React, { useState } from 'react';
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
import PrivateRoutes from './pages/PrivateRoutes';
import { AuthContext, AuthContextData } from './contexts/AuthContext';
import CreateCategoryPage from './pages/CreateCategoryPage';
import AdminCategoriesList from './pages/AdminCategoriesList';
import AdminCategoryDetails from './pages/AdminCategoryDetails';
import AnimeForm from './components/AnimeForm';
import EditAnimePage from './pages/EditAnimePage';
import CreateAnimePage from './pages/CreateAnimePage';
import EditCategoryPage from './pages/EditCategoryPage';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={ <Root /> }
      errorElement={ <ErrorPage /> }
    >
      <Route element={ <Home /> } index />
      <Route path='animes' element={ <Animes /> } />
      <Route
        element={ <PrivateRoutes roles={[]} /> }
      >
        <Route path="animes/:id" element={ <AnimeDetailsPage /> } />
      </Route>
      <Route
        element={ <PrivateRoutes roles={['ROLE_ADMIN', 'ROLE_WORKER']} redirectTo='/animes' /> }
      >
        <Route
        path="admin"
        element={ <AdminRoot /> }
        >
          <Route element={ <AdminIndex /> } index />
          <Route path="animes" element={ <AdminAnimesList /> } />
          <Route path="animes/create" element={ <CreateAnimePage /> } />
          <Route path="animes/edit/:id" element={ <EditAnimePage /> } />
          <Route path='categories' element={ <AdminCategoriesList /> } />
          <Route path='categories/create' element={ <CreateCategoryPage /> } />
          <Route path="categories/edit/:id" element={ <EditCategoryPage /> } />
          <Route path='categories/:id' element={ <AdminCategoryDetails /> } />
        </Route>
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
    </Route>
  )
);

const App = () => {

  const [authContextData, setAuthContextData] = useState<AuthContextData>({
    authenticated: false
  });

  return (
    <AuthContext.Provider value={{authContextData, setAuthContextData}} >
      <RouterProvider router={router} />
      <ToastContainer
        theme='dark'
        position='bottom-right'
        autoClose={3000}
      />
    </AuthContext.Provider>

  );
}

export default App;
