import React from 'react';
import { Link } from 'react-router-dom';
import { Trophy, Facebook, Twitter, Instagram, Mail, Phone } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const navigation = {
    main: [
      { name: 'Accueil', href: '/' },
      { name: 'Live Scores', href: '/live' },
      { name: 'Actualités', href: '/news' },
      { name: 'Mes Pronos', href: '/mes-pronos' },
    ],
    social: [
      { name: 'Facebook', icon: Facebook, href: '#' },
      { name: 'Twitter', icon: Twitter, href: '#' },
      { name: 'Instagram', icon: Instagram, href: '#' },
    ],
    legal: [
      { name: 'Mentions légales', href: '#' },
      { name: 'Politique de confidentialité', href: '#' },
      { name: 'CGU', href: '#' },
    ]
  };

  return (
    <footer className="bg-gradient-to-r from-primary to-secondary text-white mt-12">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Trophy className="h-8 w-8 text-accent" />
              <span className="text-xl font-bold">PronoSport</span>
            </div>
            <p className="text-gray-100">
              Votre plateforme de pronostics sportifs de confiance depuis 2024.
            </p>
            <div className="flex space-x-4">
              {navigation.social.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-100 hover:text-accent transition-colors"
                >
                  <span className="sr-only">{item.name}</span>
                  <item.icon className="h-6 w-6" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-accent">Navigation</h3>
            <ul className="space-y-2">
              {navigation.main.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className="text-gray-100 hover:text-accent transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-accent">Contact</h3>
            <ul className="space-y-2 text-gray-100">
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2" />
                contact@pronosport.fr
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-2" />
                01 23 45 67 89
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-accent">Informations légales</h3>
            <ul className="space-y-2">
              {navigation.legal.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="text-gray-100 hover:text-accent transition-colors"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 text-center text-gray-100">
          <p>© {currentYear} PronoSport. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}