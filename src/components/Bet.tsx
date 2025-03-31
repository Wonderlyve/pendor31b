import React from 'react';
import { X, Calendar, Clock, Star } from 'lucide-react';

interface BetProps {
  isOpen: boolean;
  onClose: () => void;
  prediction: {
    id: number;
    text: string;
    date: string;
    time: string;
    odds: number;
    confidence: number;
    expert: string;
    expertRating: number;
    expertImage: string;
    matches?: Array<{
      team1: string;
      team2: string;
      betType: string;
      prediction: string;
    }>;
  };
}

export default function Bet({ isOpen, onClose, prediction }: BetProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 overflow-y-auto">
      <div className="min-h-screen px-4 text-center">
        <div className="fixed inset-0" onClick={onClose}></div>
        
        {/* Modal */}
        <div className="inline-block w-full max-w-4xl my-8 text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
          {/* Header */}
          <div className="border-b px-6 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img 
                src={prediction.expertImage}
                alt={prediction.expert}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="text-xl font-bold">{prediction.expert}</h3>
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="text-gray-600">{prediction.expertRating}</span>
                </div>
                <p className="text-gray-500 flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {prediction.date}
                  <Clock className="h-4 w-4 ml-2" />
                  {prediction.time}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="mb-6">
              <h4 className="text-lg font-semibold mb-2">Détails des paris</h4>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Match
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Type de pari
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Pronostic
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {prediction.matches?.map((match, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="font-medium">{match.team1}</span>
                          <span className="text-gray-500"> vs </span>
                          <span className="font-medium">{match.team2}</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                          {match.betType}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            {match.prediction}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="text-lg font-semibold mb-2">Analyse</h4>
              <p className="text-gray-700 whitespace-pre-line">{prediction.text}</p>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t px-6 py-4 bg-gray-50 rounded-b-2xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div>
                  <p className="text-sm text-gray-600">Côte totale</p>
                  <p className="text-xl font-bold text-green-600">{prediction.odds}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Confiance</p>
                  <p className="text-xl font-bold text-blue-600">{prediction.confidence}%</p>
                </div>
              </div>
              <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Parier maintenant
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}