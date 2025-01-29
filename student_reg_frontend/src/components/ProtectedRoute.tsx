import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
  role?: 'student' | 'admin';
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, role = 'student' }) => {
  // Get auth token from localStorage
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('userRole');

  if (!token) {
    // Redirect to appropriate login page based on role
    return <Navigate to={role === 'admin' ? '/admin/signin' : '/student/signin'} replace />;
  }

  // Check if user has correct role
  if (role && userRole !== role) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
