import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router';
import {
  createRoutesFromElements,
  createBrowserRouter,
  Route
} from "react-router-dom";
import ErrorPage from './pages/ErrorPage';
import Root from './pages/Root';
import Home from './pages/Home';
import Animes from './pages/Animes';
import AnimeDetailsPage from './pages/AnimeDetailsPage';

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
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
