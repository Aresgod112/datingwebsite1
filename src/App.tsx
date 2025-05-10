import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useUserStore } from './store/userStore';
import { 
  LoginPage, 
  Dashboard, 
  MatchesPage, 
  DiscoverPage, 
  MessagesPage, 
  ProfilePage 
} from './pages';

const App: React.FC = () => {
  const { isAuthenticated, login } = useUserStore();

  // Auto-login for demo purposes
  useEffect(() => {
    if (!isAuthenticated) {
      login('demo@example.com', 'password');
    }
  }, [isAuthenticated, login]);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={!isAuthenticated ? <LoginPage /> : <Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}>
          <Route index element={<Navigate to="/dashboard/discover" replace />} />
          <Route path="matches" element={<MatchesPage />} />
          <Route path="discover" element={<DiscoverPage />} />
          <Route path="messages" element={<MessagesPage />} />
          <Route path="messages/:id" element={<MessagesPage />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>
        <Route path="*" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />} />
      </Routes>
    </Router>
  );
};

export default App;
