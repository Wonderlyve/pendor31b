import React from 'react';
import { Package, TrendingUp, Users, DollarSign } from 'lucide-react';

export default function VendorDashboard() {
  const stats = {
    revenue: "1,250€",
    sales: 48,
    customers: 35,
    successRate: "72%"
  };

  const recentSales = [
    {
      id: 1,
      date: "2024-03-31",
      product: "Pack Ligue des Champions",
      amount: "29.99€",
      status: "completed"
    },
    {
      id: 2,
      date: "2024-03-30",
      product: "Prono du Jour",
      amount: "9.99€",
      status: "completed"
    }
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold mb-6">Tableau de Bord Vendeur</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Revenus du mois</p>
              <p className="text-xl sm:text-2xl font-bold text-green-600">{stats.revenue}</p>
            </div>
            <DollarSign className="h-8 w-8 text-green-500" />
          </div>
        </div>
        
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Ventes</p>
              <p className="text-xl sm:text-2xl font-bold text-blue-600">{stats.sales}</p>
            </div>
            <Package className="h-8 w-8 text-blue-500" />
          </div>
        </div>
        
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Clients</p>
              <p className="text-xl sm:text-2xl font-bold text-purple-600">{stats.customers}</p>
            </div>
            <Users className="h-8 w-8 text-purple-500" />
          </div>
        </div>
        
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Taux de réussite</p>
              <p className="text-xl sm:text-2xl font-bold text-orange-600">{stats.successRate}</p>
            </div>
            <TrendingUp className="h-8 w-8 text-orange-500" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
          <h2 className="text-xl font-semibold mb-4">Ventes Récentes</h2>
          <div className="space-y-4">
            {recentSales.map(sale => (
              <div key={sale.id} className="flex items-center justify-between border-b pb-4">
                <div className="min-w-0 flex-1">
                  <p className="font-medium truncate">{sale.product}</p>
                  <p className="text-sm text-gray-600">{sale.date}</p>
                </div>
                <span className="ml-4 font-semibold text-green-600 whitespace-nowrap">{sale.amount}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
          <h2 className="text-xl font-semibold mb-4">Ajouter un Pronostic</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Titre</label>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Pack Ligue 1 - Journée 30"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Prix (€)</label>
              <input
                type="number"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="9.99"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                rows={3}
                placeholder="Détaillez vos pronostics..."
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
            >
              Publier le Pronostic
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}