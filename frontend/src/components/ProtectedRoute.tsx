import type { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../services';

interface ProtectedRouteProps {
  children: ReactNode;
  requireAuth?: boolean;
  requireRole?: 'admin' | 'user';
  redirectTo?: string;
}

export default function ProtectedRoute({ 
  children, 
  requireAuth = true, 
  requireRole,
  redirectTo = '/'
}: ProtectedRouteProps) {
  const { user } = useAuth();
  const location = useLocation();

  // Si la autenticacion no es requerida, muestra el contenido
  if (!requireAuth) {
    return <>{children}</>;
  }

  // Si el usuario no ha iniciado sesión lo manda al login
  if (!user) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  // Si el rol es requerido y el usuario no lo tiene lo manda al login
  if (requireRole && user.role !== requireRole) {
    return <Navigate to={redirectTo} replace />;
  }

  // Si el usuario esta autenticado y tiene el rol requerido muestra el contenido
  return <>{children}</>;
} 