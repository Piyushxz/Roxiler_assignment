import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: ('SYSTEM_ADMIN' | 'NORMAL_USER' | 'STORE_OWNER')[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1>Loading...</h1>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    switch (user.role) {
      case 'SYSTEM_ADMIN':
        return <Navigate to="/admin" replace />;
      case 'STORE_OWNER':
        return <Navigate to="/owner" replace />;
      default:
        return <Navigate to="/user" replace />;
    }
  }

  return <>{children}</>;
};

export default ProtectedRoute;