import { Navigate, Outlet } from 'react-router-dom';
import { isAdminAuthenticated } from '@/utils/auth';

export default function ProtectedRoute() {
  return isAdminAuthenticated() ? <Outlet /> : <Navigate to="/login" replace />;
} 