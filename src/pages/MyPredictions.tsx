import React, { useState, useRef } from 'react';
import { Trophy, TrendingUp, Calendar, Star, X, Bell, Plus, Image as ImageIcon, Check, Trash2 } from 'lucide-react';
import { usePosts } from '../context/PostContext';
import { teams, betTypes, Team, Match } from '../data/teams';

export default function MyPredictions() {
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [showNotification, setShowNotification] = useState(true);
  const [currentPredictionToRate, setCurrentPredictionToRate] = useState<any>(null);
  const [rating, setRating] = useState(0);
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [showSuccessNotification, setShowSuccessNotification] = useState(false);
  const [matches, setMatches] = useState<Match[]>([]);
  const [currentMatch, setCurrentMatch] = useState<{
    team1: string;
    team2: string;
    betType: string;
    betValue: string;
    customBet: string;
  }>({
    team1: '',
    team2: '',
    betType: '',
    betValue: '',
    customBet: '',
  });
  
  const [newPost, setNewPost] = useState({
    text: '',
    totalOdds: '',
    confidence: 85,
    image: null as string | null,
  });
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { addPost } = usePosts();

  const predictions = [
    {
      id: 1,
      match: "PSG vs Marseille",
      prediction: "1",
      odds: 1.45,
      status: "En attente",
      date: "2024-03-31",
      tipster: "Expert Pronos",
      needsRating: false
    },
    {
      id: 2,
      match: "Lyon vs Monaco",
      prediction: "X",
      odds: 3.40,
      status: "Gagné",
      date: "2024-03-30",
      tipster: "Top Tipster",
      needsRating: true
    },
    {
      id: 3,
      match: "Lille vs Rennes",
      prediction: "2",
      odds: 3.20,
      status: "Perdu",
      date: "2024-03-29",
      tipster: "French Football Tips",
      needsRating: true
    }
  ];

  const stats = {
    total: 50,
    wins: 28,
    losses: 22,
    winRate: 56,
    avgOdds: 2.15
  };

  const handleAddMatch = () => {
    const team1Data = teams.find(t => t.id === currentMatch.team1);
    const team2Data = teams.find(t => t.id === currentMatch.team2);
    
    if (team1Data && team2Data && currentMatch.betType) {
      const betValue = currentMatch.betType === "Personnalisé" 
        ? currentMatch.customBet 
        : currentMatch.betValue;

      if (!betValue) return;

      setMatches([...matches, {
        team1: team1Data,
        team2: team2Data,
        betType: currentMatch.betType,
        betValue: betValue,
        customBet: currentMatch.betType === "Personnalisé" ? currentMatch.customBet : undefined
      }]);
      
      setCurrentMatch({
        team1: '',
        team2: '',
        betType: '',
        betValue: '',
        customBet: '',
      });
    }
  };

  const handleRemoveMatch = (index: number) => {
    setMatches(matches.filter((_, i) => i !== index));
  };

  const handleRating = (predictionId: number) => {
    const prediction = predictions.find(p => p.id === predictionId);
    setCurrentPredictionToRate(prediction);
    setShowRatingModal(true);
  };

  const submitRating = () => {
    console.log(`Rating ${rating} submitted for ${currentPredictionToRate?.tipster}`);
    setShowRatingModal(false);
    setRating(0);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewPost(prev => ({ ...prev, image: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    
    const now = new Date();
    const date = now.toISOString().split('T')[0];
    const time = now.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });

    // Ajouter les matches au texte du pronostic
    const matchesText = matches.map(match => 
      `${match.team1.name} vs ${match.team2.name} - ${match.betType}${match.customBet ? ' (Personnalisé)' : ''}: ${match.betValue}`
    ).join('\n');

    const fullText = `${matchesText}\n\n${newPost.text}`;

    addPost({
      text: fullText,
      date,
      time,
      odds: parseFloat(newPost.totalOdds),
      confidence: newPost.confidence,
      image: newPost.image,
    });

    setShowCreatePost(false);
    setNewPost({ text: '', totalOdds: '', confidence: 85, image: null });
    setMatches([]);
    setShowSuccessNotification(true);
    setTimeout(() => setShowSuccessNotification(false), 3000);
  };

  const notifications = [
    {
      id: 1,
      message: "Pack Ligue 1 - Journée 30 terminé ! Donnez votre avis sur Top Tipster",
      predictionId: 2
    }
  ];

  return (
    <div className="space-y-6 relative">
      {/* Success Notification */}
      {showSuccessNotification && (
        <div className="fixed top-20 right-4 z-50 bg-green-100 border-l-4 border-green-500 p-4 rounded shadow-lg animate-fade-in">
          <div className="flex items-center">
            <Check className="h-5 w-5 text-green-500 mr-2" />
            <p className="text-green-700">Pronostic publié avec succès !</p>
          </div>
        </div>
      )}

      {/* Notifications */}
      {showNotification && notifications.length > 0 && (
        <div className="fixed top-20 right-4 z-50">
          {notifications.map((notification) => (
            <div key={notification.id} className="bg-white rounded-lg shadow-lg p-4 mb-2 animate-fade-in-down flex items-start">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Bell className="h-5 w-5 text-blue-500" />
                  <p className="text-sm font-medium">{notification.message}</p>
                </div>
                <button
                  onClick={() => handleRating(notification.predictionId)}
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  Noter maintenant
                </button>
              </div>
              <button
                onClick={() => setShowNotification(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Create Post Button */}
      <button
        onClick={() => setShowCreatePost(true)}
        className="fixed bottom-20 right-4 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors z-40"
      >
        <Plus className="h-6 w-6" />
      </button>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <Trophy className="h-6 w-6 text-yellow-500 mr-2" />
            Mes Statistiques
          </h2>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-50 rounded-lg p-4">
              <p className="text-sm text-gray-600">Taux de réussite</p>
              <p className="text-2xl font-bold text-blue-600">{stats.winRate}%</p>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <p className="text-sm text-gray-600">Cote moyenne</p>
              <p className="text-2xl font-bold text-green-600">{stats.avgOdds}</p>
            </div>
            <div className="bg-yellow-50 rounded-lg p-4">
              <p className="text-sm text-gray-600">Paris gagnés</p>
              <p className="text-2xl font-bold text-yellow-600">{stats.wins}</p>
            </div>
            <div className="bg-red-50 rounded-lg p-4">
              <p className="text-sm text-gray-600">Paris perdus</p>
              <p className="text-2xl font-bold text-red-600">{stats.losses}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <TrendingUp className="h-6 w-6 text-green-500 mr-2" />
            Derniers Paris
          </h2>
          
          <div className="space-y-4">
            {predictions.map(pred => (
              <div key={pred.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold">{pred.match}</span>
                  <span className={`text-sm px-2 py-1 rounded ${
                    pred.status === "Gagné" ? "bg-green-100 text-green-800" :
                    pred.status === "Perdu" ? "bg-red-100 text-red-800" :
                    "bg-gray-100 text-gray-800"
                  }`}>
                    {pred.status}
                  </span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Pronostic: {pred.prediction}</span>
                  <span>Cote: {pred.odds}</span>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="h-4 w-4 mr-1" />
                    {pred.date}
                  </div>
                  {pred.needsRating && (
                    <button
                      onClick={() => handleRating(pred.id)}
                      className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1"
                    >
                      <Star className="h-4 w-4" />
                      Noter le pronostiqueur
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Create Post Modal */}
      {showCreatePost && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Publier un pronostic</h3>
              <button onClick={() => setShowCreatePost(false)} className="text-gray-400 hover:text-gray-600">
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <form onSubmit={handleCreatePost} className="space-y-4">
              {/* Match Selection Section */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium mb-3">Ajouter des matches</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 mb-3">
                  <select
                    value={currentMatch.team1}
                    onChange={(e) => setCurrentMatch({...currentMatch, team1: e.target.value})}
                    className="rounded-lg border border-gray-300 p-2"
                  >
                    <option value="">Équipe 1</option>
                    {teams.map(team => (
                      <option key={team.id} value={team.id}>
                        {team.name}
                      </option>
                    ))}
                  </select>

                  <select
                    value={currentMatch.team2}
                    onChange={(e) => setCurrentMatch({...currentMatch, team2: e.target.value})}
                    className="rounded-lg border border-gray-300 p-2"
                  >
                    <option value="">Équipe 2</option>
                    {teams.map(team => (
                      <option key={team.id} value={team.id}>
                        {team.name}
                      </option>
                    ))}
                  </select>

                  <select
                    value={currentMatch.betType}
                    onChange={(e) => setCurrentMatch({...currentMatch, betType: e.target.value, betValue: '', customBet: ''})}
                    className="rounded-lg border border-gray-300 p-2"
                  >
                    <option value="">Type de pari</option>
                    {Object.keys(betTypes).map(type => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>

                  {currentMatch.betType && (
                    currentMatch.betType === "Personnalisé" ? (
                      <input
                        type="text"
                        value={currentMatch.customBet}
                        onChange={(e) => setCurrentMatch({...currentMatch, customBet: e.target.value})}
                        placeholder="Entrez votre pari"
                        className="rounded-lg border border-gray-300 p-2"
                      />
                    ) : (
                      <select
                        value={currentMatch.betValue}
                        onChange={(e) => setCurrentMatch({...currentMatch, betValue: e.target.value})}
                        className="rounded-lg border border-gray-300 p-2"
                      >
                        <option value="">Sélectionner</option>
                        {betTypes[currentMatch.betType as keyof typeof betTypes].map(value => (
                          <option key={value} value={value}>
                            {value}
                          </option>
                        ))}
                      </select>
                    )
                  )}
                </div>
                
                <button
                  type="button"
                  onClick={handleAddMatch}
                  disabled={!currentMatch.team1 || !currentMatch.team2 || !currentMatch.betType || 
                    (currentMatch.betType === "Personnalisé" ? !currentMatch.customBet : !currentMatch.betValue)}
                  className="w-full bg-blue-100 text-blue-600 py-2 rounded-lg hover:bg-blue-200 transition-colors mb-3 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  + Ajouter ce match
                </button>

                {/* Selected Matches List */}
                {matches.length > 0 && (
                  <div className="space-y-2">
                    {matches.map((match, index) => (
                      <div key={index} className="flex items-center justify-between bg-white p-2 rounded-lg border">
                        <div className="flex items-center space-x-2">
                          <img src={match.team1.logo} alt={match.team1.name} className="w-6 h-6 rounded-full" />
                          <span>vs</span>
                          <img src={match.team2.logo} alt={match.team2.name} className="w-6 h-6 rounded-full" />
                          <span className="text-sm text-gray-600">
                            - {match.betType}{match.customBet ? ' (Personnalisé)' : ''}: {match.betValue}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemoveMatch(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Votre analyse
                </label>
                <textarea
                  value={newPost.text}
                  onChange={(e) => setNewPost({ ...newPost, text: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={4}
                  placeholder="Partagez votre analyse détaillée..."
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Côte totale
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={newPost.totalOdds}
                  onChange={(e) => setNewPost({ ...newPost, totalOdds: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="3.50"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Indice de confiance: {newPost.confidence}%
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={newPost.confidence}
                  onChange={(e) => setNewPost({ ...newPost, confidence: parseInt(e.target.value) })}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Image (optionnel)
                </label>
                <div className="mt-1 flex items-center">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                  >
                    <ImageIcon className="h-5 w-5 text-gray-400" />
                    <span>Ajouter une image</span>
                  </button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageUpload}
                    accept="image/*"
                    className="hidden"
                  />
                </div>
                {newPost.image && (
                  <div className="mt-2 relative">
                    <img
                      src={newPost.image}
                      alt="Preview"
                      className="h-32 w-auto rounded-lg object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => setNewPost({ ...newPost, image: null })}
                      className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowCreatePost(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Publier
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Rating Modal */}
      {showRatingModal && currentPredictionToRate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Noter {currentPredictionToRate.tipster}</h3>
              <button onClick={() => setShowRatingModal(false)} className="text-gray-400 hover:text-gray-600">
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <p className="text-gray-600 mb-4">
              Comment évaluez-vous la qualité de ce pronostic ?
            </p>

            <div className="flex justify-center gap-2 mb-6">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  className={`transition-colors ${
                    star <= rating ? 'text-yellow-400' : 'text-gray-300'
                  }`}
                >
                  <Star className="h-8 w-8 fill-current" />
                </button>
              ))}
            </div>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowRatingModal(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Annuler
              </button>
              <button
                onClick={submitRating}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                disabled={rating === 0}
              >
                Envoyer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}