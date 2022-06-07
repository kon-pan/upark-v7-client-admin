import { Navigate } from 'react-router-dom';
import useAuth from '../common/contexts/AuthContex';

// Source: https://ui.dev/react-router-protected-routes-authentication
const RequireAuth = ({ children }: any) => {
  const { admin } = useAuth();

  return admin?.id && admin.role === 'admin' ? (
    children
  ) : (
    <Navigate to='/login' replace />
  );
};

export default RequireAuth;
