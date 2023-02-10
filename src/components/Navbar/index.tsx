import { useState, useEffect, useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import { getTokenData, isAuthenticated, TokenData } from '../../util/auth';
import { removeAuthData } from '../../util/storage';
import './styles.css';

type AuthData = {
  authenticated: boolean,
  tokenData?: TokenData
}

const Navbar = () => {

  const { authContextData, setAuthContextData } = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    if(isAuthenticated()) {
      setAuthContextData({
        authenticated: true,
        tokenData: getTokenData()
      });
    }
    else {
      setAuthContextData({
        authenticated: false
      })
    }
  }, [setAuthContextData]);

  const handleLogoutClick = (event: React.MouseEvent) => {
    event.preventDefault();
    removeAuthData();
    setAuthContextData({
      authenticated: false
    });
    navigate('/auth/login', {
      replace: true
    });
  }

  return (
    <nav className="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
      <div className="container">
        <NavLink className="navbar-brand" to="/">Anime Flix</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarItems" aria-controls="navbarItems" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarItems">
          <ul className="navbar-nav mb-0">
            <li className="nav-item">
              <NavLink className="nav-link" aria-current="page" to="/">Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="animes">Animes</NavLink>
            </li>

              <li className="nav-item">
                <NavLink className="nav-link" to="admin">Admin</NavLink>
              </li>
          </ul>
          <ul className="navbar-nav mb-2 mb-lg-0">
            { authContextData.authenticated && (
              <li className="nav-item">
                <span className="nav-link text-white">{ authContextData?.tokenData?.user_name }</span>
              </li>
            ) }

            <li className="nav-item">
              { authContextData.authenticated ? (
                <>
                  <NavLink className="nav-link" to="logout" onClick={handleLogoutClick}>Logout</NavLink>
                </>
              ) : (
                <NavLink className="nav-link" to="auth/login">Login</NavLink>
              ) }

            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
