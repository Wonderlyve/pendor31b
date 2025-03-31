import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Channels from './pages/Channels';
import MyPredictions from './pages/MyPredictions';
import VendorDashboard from './pages/VendorDashboard';
import Invoices from './pages/Invoices';
import Login from './pages/Login';
import Signup from './pages/Signup';
import BottomNav from './components/BottomNav';
import { PostProvider } from './context/PostContext';
import { AuthProvider } from './context/AuthContext';
import { useAuth } from './context/AuthContext';

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  return user ? <>{children}</> : <Navigate to="/login" />;
}

function App() {
  return (
    <AuthProvider>
      <PostProvider>
        <Router>
          <div className="min-h-screen bg-sport-pattern pb-16">
            <Navbar />
            <main className="container mx-auto px-4 py-8 mt-16">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/channels" element={<Channels />} />
                <Route path="/mes-pronos" element={
                  <PrivateRoute>
                    <MyPredictions />
                  </PrivateRoute>
                } />
                <Route path="/vendor" element={
                  <PrivateRoute>
                    <VendorDashboard />
                  </PrivateRoute>
                } />
                <Route path="/invoices" element={
                  <PrivateRoute>
                    <Invoices />
                  </PrivateRoute>
                } />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
              </Routes>
            </main>
            <BottomNav />
          </div>
        </Router>
      </PostProvider>
    </AuthProvider>
  );
}

export default App;