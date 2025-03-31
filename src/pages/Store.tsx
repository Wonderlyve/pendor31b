import React, { useState } from 'react';
import { Star, ShoppingCart, Filter, ChevronDown } from 'lucide-react';
import AdBanner from '../components/AdBanner';

export default function Store() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const predictions = [
    {
      id: 1,
      title: "Pack Ligue des Champions",
      vendor: "Expert Pronos",
      price: 29.99,
      rating: 4.8,
      reviews: 124,
      successRate: "85%",
      image: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&q=80&w=800",
      description: "Analyses détaillées et pronostics pour les matchs de LDC"
    },
    {
      id: 2,
      title: "Prono du Jour Premium",
      vendor: "Top Tipster",
      price: 9.99,
      rating: 4.5,
      reviews: 89,
      successRate: "78%",
      image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=800",
      description: "Le meilleur pronostic du jour avec analyse complète"
    },
    {
      id: 3,
      title: "Pack Week-end Ligue 1",
      vendor: "French Football Tips",
      price: 19.99,
      rating: 4.7,
      reviews: 156,
      successRate: "82%",
      image: "https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?auto=format&fit=crop&q=80&w=800",
      description: "Tous les pronostics Ligue 1 du week-end"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">Boutique Pronostics</h1>

        {/* Filtre Button */}
        <div className="relative">
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="flex items-center justify-center space-x-2 bg-blue-600 px-4 py-2 rounded-lg text-white hover:bg-blue-700 transition-colors"
          >
            <Filter className="h-5 w-5 text-white" />
            <span>Filtrer</span>
            <ChevronDown className={`h-5 w-5 transform ${isFilterOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* Dropdown Menu for Filter */}
          {isFilterOpen && (
            <div className="absolute top-12 right-0 w-48 bg-white shadow-lg rounded-lg border z-10">
              <ul className="space-y-2 p-2">
                <li>
                  <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg">
                    Corners
                  </button>
                </li>
                <li>
                  <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg">
                    Buts
                  </button>
                </li>
                <li>
                  <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg">
                    1X2
                  </button>
                </li>
                <li>
                  <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg">
                    Plus de filtres
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {predictions.map(pred => (
          <div key={pred.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className="aspect-video relative">
              <img 
                src={pred.image} 
                alt={pred.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
            <div className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-2">
                <h3 className="text-lg font-semibold">{pred.title}</h3>
                <span className="text-lg font-bold text-green-600 whitespace-nowrap">{pred.price}€</span>
              </div>
              <p className="text-sm text-gray-600 mb-4">{pred.description}</p>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-4">
                <div className="flex items-center space-x-1">
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <span className="font-medium">{pred.rating}</span>
                  <span className="text-gray-500">({pred.reviews})</span>
                </div>
                <span className="text-sm font-medium text-blue-600">
                  Réussite: {pred.successRate}
                </span>
              </div>
              <div className="space-y-3">
                <p className="text-sm text-gray-600">Par <span className="font-medium">{pred.vendor}</span></p>
                <button className="w-full flex items-center justify-center space-x-2 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                  <ShoppingCart className="h-5 w-5" />
                  <span>Acheter</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <AdBanner className="w-full" />
    </div>
  );
}
