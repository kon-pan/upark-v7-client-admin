import './Login.css';
import AuthLayout from '../../common/components/layout/auth/AuthLayout';
import LoginForm from './LoginForm';

const Login = () => {
  return (
    <AuthLayout>
      <LoginForm />
    </AuthLayout>
  );
};

export default Login;
