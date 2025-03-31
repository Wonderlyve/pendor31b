import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trophy, User, LayoutDashboard, Menu, X, Bell, MessageCircle, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  const [profileData, setProfileData] = useState<{ avatar_url: string } | null>(null);
  const navigate = useNavigate();

  React.useEffect(() => {
    const fetchProfile = async () => {
      if (user) {
        const { data, error } = await supabase
          .from('profiles')
          .select('avatar_url')
          .eq('id', user.id)
          .single();

        if (!error && data) {
          setProfileData(data);
        }
      }
    };

    fetchProfile();
  }, [user]);

  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <nav className="bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white shadow-lg fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Trophy className="h-8 w-8 text-accent animate-pulse-slow" />
            <span className="text-xl font-bold">PENDOR</span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-6">
            <Link to="/channels" className="flex items-center space-x-1 hover:text-accent transition-colors">
              <MessageCircle className="h-5 w-5" />
              <span>Canaux</span>
            </Link>
            <Link to="/mes-pronos" className="flex items-center space-x-1 hover:text-accent transition-colors">
              <User className="h-5 w-5" />
              <span>Mes Pronos</span>
            </Link>
            <Link to="/vendor" className="flex items-center space-x-1 hover:text-accent transition-colors">
              <LayoutDashboard className="h-5 w-5" />
              <span>Espace Vendeur</span>
            </Link>
          </div>

          {/* Mobile Navigation (Icons before Hamburger) */}
          <div className="md:hidden flex items-center space-x-4">
            {/* Notifications Icon */}
            <div className="relative">
              <Bell className="h-6 w-6 hover:text-accent transition-colors" />
              <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500"></span>
            </div>

            {/* Profile Icon/Image */}
            <Link to={user ? "/mes-pronos" : "/login"}>
              {user && profileData?.avatar_url ? (
                <img
                  src={profileData.avatar_url}
                  alt="Profile"
                  className="h-8 w-8 rounded-full object-cover"
                />
              ) : (
                <User className="h-6 w-6 hover:text-accent transition-colors" />
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button 
              className="p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation (Menu Items) */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-4">
            <Link 
              to="/channels" 
              className="block hover:text-accent transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              <div className="flex items-center space-x-2">
                <MessageCircle className="h-5 w-5" />
                <span>Canaux</span>
              </div>
            </Link>
            <Link 
              to="/mes-pronos" 
              className="block hover:text-accent transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              <div className="flex items-center space-x-2">
                <User className="h-5 w-5" />
                <span>Mes Pronos</span>
              </div>
            </Link>
            <Link 
              to="/vendor" 
              className="block hover:text-accent transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              <div className="flex items-center space-x-2">
                <LayoutDashboard className="h-5 w-5" />
                <span>Espace Vendeur</span>
              </div>
            </Link>
            {user && (
              <button 
                onClick={() => {
                  handleLogout();
                  setIsMenuOpen(false);
                }}
                className="w-full text-left flex items-center space-x-2 text-red-300 hover:text-red-100 transition-colors"
              >
                <LogOut className="h-5 w-5" />
                <span>Se déconnecter</span>
              </button>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}