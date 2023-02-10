import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { hasAnyRole, isAuthenticated, Role } from '../../util/auth';

type Props = {
  roles: Role[],
  redirectTo?: string
}

const PrivateRoutes = ({ roles, redirectTo = '/' }: Props) => {

  const { pathname } = useLocation();

  if(!isAuthenticated()) {
    toast.info('É necessário estar logado para acessar esse conteúdo');
    return <Navigate to={'/auth/login'} replace state={{
      from: pathname
    }} />
  }

  if(roles.length === 0 || hasAnyRole(roles)) {
    return <Outlet />
  }
  else {
    toast.info('O seu perfil de usuário não possui permissão para acessar esse conteúdo');
    return <Navigate to={redirectTo} replace />
  }

}

export default PrivateRoutes;
