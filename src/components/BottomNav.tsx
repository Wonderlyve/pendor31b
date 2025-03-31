import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, MessageCircle, User } from 'lucide-react';

export default function BottomNav() {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path ? 'text-accent' : 'text-gray-500';
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-2 px-4">
      <div className="container mx-auto">
        <div className="flex justify-around items-center">
          <Link to="/" className={`flex flex-col items-center ${isActive('/')}`}>
            <Home className="h-6 w-6" />
            <span className="text-xs mt-1">Accueil</span>
          </Link>
          
          <Link to="/channels" className={`flex flex-col items-center ${isActive('/channels')}`}>
            <MessageCircle className="h-6 w-6" />
            <span className="text-xs mt-1">Canaux</span>
          </Link>
          
          <Link to="/mes-pronos" className={`flex flex-col items-center ${isActive('/mes-pronos')}`}>
            <User className="h-6 w-6" />
            <span className="text-xs mt-1">Profil</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}