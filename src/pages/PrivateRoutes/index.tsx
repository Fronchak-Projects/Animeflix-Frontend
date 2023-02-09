import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { hasAnyRole, Role } from '../../util/auth';
import { getAuthData } from '../../util/storage';

type Props = {
  roles: Role[]
}

const PrivateRoutes = ({ roles }: Props) => {
  console.log('Passou pelo private routes');
  const { pathname } = useLocation();
  console.log(pathname);


  if(hasAnyRole(roles)) {
    return <Outlet />
  }
  else {
    return <Navigate to={'/auth/login'} replace state={{
      from: pathname
    }} />
  }

}

export default PrivateRoutes;
