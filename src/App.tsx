import React from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { LoginScreen } from './components/LoginScreen';
import { Dashboard } from './components/Dashboard';

const AppContent: React.FC = () => {
  const { user } = useAuth();

  if (!user) {
    return <LoginScreen />;
  }

  return <Dashboard />;
};

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-black">
        <AppContent />
      </div>
    </AuthProvider>
  );
}

export default App;