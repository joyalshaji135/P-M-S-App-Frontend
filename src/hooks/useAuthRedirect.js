// hooks/useAuthRedirect.js
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const useAuthRedirect = () => {
  const navigate = useNavigate();
  const role = useSelector((state) => state.store.selectors.getCurrentRole());

  const redirectToDashboard = () => {
    const from = location.state?.from?.pathname || getDashboardPath();
    navigate(from, { replace: true });
  };

  const getDashboardPath = () => {
    switch (role) {
      case 'admin': return '/admin';
      case 'company-owners': return '/owner';
      case 'team-managers': return '/team-manager';
      case 'team-members': return '/team-member';
      default: return '/login';
    }
  };

  return { redirectToDashboard };
};