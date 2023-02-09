import { Navigate } from 'react-router-dom';
import { removeAuthData } from '../../util/storage';

const Logout = () => {
  removeAuthData();
  return <Navigate to={'/'} />
}

export default Logout;
