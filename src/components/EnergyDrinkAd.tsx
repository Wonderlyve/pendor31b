import React from 'react';
import { Zap, ArrowRight } from 'lucide-react';

interface EnergyDrinkAdProps {
  className?: string;
}

const energyDrinks = [
  {
    id: 1,
    name: "Power Boost",
    tagline: "Boost your energy, boost your game!",
    image: "https://images.unsplash.com/photo-1622543925917-763c34d1a86e?auto=format&fit=crop&q=80&w=800",
    description: "La boisson officielle des champions",
    price: "2.99€"
  },
];

export default function EnergyDrinkAd({ className = "" }: EnergyDrinkAdProps) {
  return (
    <div className={`space-y-4 ${className}`}>
      {energyDrinks.map((drink) => (
        <div
          key={drink.id}
          className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
        >
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2 relative">
              <img
                src={drink.image}
                alt={drink.name}
                className="w-full h-48 md:h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30" />
            </div>
            
            <div className="md:w-1/2 p-6 text-white">
              <div className="flex items-center mb-2">
                <Zap className="h-6 w-6 text-yellow-400 mr-2" />
                <h3 className="text-xl font-bold">{drink.name}</h3>
              </div>
              
              <p className="text-lg font-semibold mb-2">{drink.tagline}</p>
              <p className="text-sm text-gray-200 mb-4">{drink.description}</p>
              
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold">{drink.price}</span>
                <button className="flex items-center bg-white text-purple-600 px-4 py-2 rounded-full font-semibold hover:bg-opacity-90 transition-colors">
                  Commander
                  <ArrowRight className="h-4 w-4 ml-2" />
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}