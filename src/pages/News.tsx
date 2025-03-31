import React, { useState, useEffect } from 'react';
import axios from 'axios';
//import AdBanner from '../components/AdBanner';
import { 
  Newspaper, 
  Clock, 
  Share2, 
  MessageCircle, 
  ThumbsUp,
  Search,
  TrendingUp,
  Filter
} from 'lucide-react';

interface NewsArticle {
  id: number;
  title: string;
  description: string;
  category: string;
  author: {
    name: string;
    image: string;
  };
  publishedAt: string;
  image: string;
  likes: number;
  comments: number;
  shares: number;
}

export default function News() {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', icon: Newspaper, label: 'Tout' },
    { id: 'trending', icon: TrendingUp, label: 'Tendances' },
    { id: 'football', icon: '⚽', label: 'Football' },
    { id: 'basketball', icon: '🏀', label: 'Basketball' },
    { id: 'tennis', icon: '🎾', label: 'Tennis' },
    { id: 'rugby', icon: '🏉', label: 'Rugby' }
  ];

  // Simulated news data (replace with real API call)
  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      try {
        // Simulated data - replace with actual API call
        const mockArticles: NewsArticle[] = [
          {
            id: 1,
            title: "PSG qualifié pour les demi-finales de la Ligue des Champions",
            description: "Une victoire historique qui propulse le club parisien vers de nouveaux sommets. Mbappé encore décisif avec un doublé qui fait rêver les supporters.",
            category: "football",
            author: {
              name: "Thomas Sport",
              image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100"
            },
            publishedAt: "2024-03-31T15:30:00Z",
            image: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&q=80&w=800",
            likes: 1234,
            comments: 89,
            shares: 45
          },
          {
            id: 2,
            title: "NBA : Les Lakers se qualifient pour les playoffs",
            description: "LeBron James mène son équipe vers une qualification historique avec une performance exceptionnelle lors du dernier match de la saison régulière.",
            category: "basketball",
            author: {
              name: "Marie Hoops",
              image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100"
            },
            publishedAt: "2024-03-31T13:15:00Z",
            image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&q=80&w=800",
            likes: 856,
            comments: 67,
            shares: 23
          },
          {
            id: 3,
            title: "Roland-Garros : Le nouveau court Philippe-Chatrier dévoilé",
            description: "Le court central de Roland-Garros fait peau neuve avec des innovations technologiques majeures pour améliorer l'expérience des joueurs et spectateurs.",
            category: "tennis",
            author: {
              name: "Pierre Tennis",
              image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100"
            },
            publishedAt: "2024-03-31T10:45:00Z",
            image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100",
            likes: 543,
            comments: 34,
            shares: 12
          }
        ];
        
        setArticles(mockArticles);
      } catch (error) {
        console.error('Error fetching news:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [activeCategory]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fr-FR', {
      day: 'numeric',
      month: 'long',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      
      {/* Search and Filter Bar */}
      <div className="bg-white rounded-lg shadow-md p-4">
        <div className="flex items-center gap-4">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Rechercher une actualité..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors text-sm">
            <Filter className="h-5 w-5" />
            <span className="hidden sm:inline">Filtrer</span>
          </button>
        </div>
      </div>

      {/* Categories */}
      <div className="flex overflow-x-auto gap-2 pb-2 hide-scrollbar">
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
              activeCategory === category.id
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            {typeof category.icon === 'string' ? (
              <span>{category.icon}</span>
            ) : (
              <category.icon className="h-5 w-5" />
            )}
            <span>{category.label}</span>
          </button>
        ))}
      </div>

      {/* News Feed */}
      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="bg-white rounded-lg shadow-md p-4 animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="h-32 bg-gray-200 rounded mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {articles.map(article => (
            <div key={article.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              {/* Author Info */}
              <div className="p-4 flex items-center space-x-3">
                <img 
                  src={article.author.image}
                  alt={article.author.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-semibold text-sm">{article.author.name}</h3>
                  <div className="text-xs text-gray-500 flex items-center space-x-2">
                    <Clock className="h-4 w-4" />
                    <span>{formatDate(article.publishedAt)}</span>
                  </div>
                </div>
              </div>

              {/* Article Content */}
              <div className="px-4 pb-3">
                <h2 className="text-lg font-semibold mb-2">{article.title}</h2>
                <p className="text-gray-600 text-sm mb-4">{article.description}</p>
              </div>

              {/* Article Image */}
              <div className="aspect-video relative">
                <img 
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Social Actions */}
              <div className="p-4 border-t flex items-center justify-between">
                <button className="flex items-center space-x-1 text-gray-600 hover:text-blue-600 text-sm">
                  <ThumbsUp className="h-5 w-5" />
                  <span>{article.likes}</span>
                </button>
                <button className="flex items-center space-x-1 text-gray-600 hover:text-blue-600 text-sm">
                  <MessageCircle className="h-5 w-5" />
                  <span>{article.comments}</span>
                </button>
                <button className="flex items-center space-x-1 text-gray-600 hover:text-blue-600 text-sm">
                  <Share2 className="h-5 w-5" />
                  <span>{article.shares}</span>
                </button>
                <button className="bg-blue-600 text-white px-4 py-1 rounded-full hover:bg-blue-700 transition-colors text-sm">
                  Lire plus
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
