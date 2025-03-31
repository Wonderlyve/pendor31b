import React, { useEffect, useRef, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AdBanner from '../components/AdBanner';
import EnergyDrinkAd from '../components/EnergyDrinkAd';
import Bet from '../components/Bet';
import Post from '../components/Post';
import { usePosts } from '../context/PostContext';
import { useAuth } from '../context/AuthContext';
import { Plus, ChevronRight } from 'lucide-react';
import CreatePost from './MyPredictions';

interface Channel {
  id: number;
  name: string;
  image: string;
  description: string;
  subscribers: number;
  rating: number;
}

export default function Home() {
  const [selectedMatch, setSelectedMatch] = React.useState<any>(null);
  const [isBetModalOpen, setIsBetModalOpen] = React.useState(false);
  const [showCreatePost, setShowCreatePost] = React.useState(false);
  const { posts, loading, hasMore, fetchMorePosts } = usePosts();
  const { user } = useAuth();
  const navigate = useNavigate();
  const observer = useRef<IntersectionObserver>();

  // Utilisation d'un ref pour le dernier élément
  const lastPostElementRef = useCallback((node: HTMLDivElement | null) => {
    if (loading) return;
    
    if (observer.current) observer.current.disconnect();
    
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        fetchMorePosts();
      }
    });
    
    if (node) observer.current.observe(node);
  }, [loading, hasMore, fetchMorePosts]);

  useEffect(() => {
    fetchMorePosts();
  }, []);

  const channels: Channel[] = [
    {
      id: 1,
      name: "Expert Pronos",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100",
      description: "Analyses détaillées et pronostics de football",
      subscribers: 1250,
      rating: 4.8
    },
    {
      id: 2,
      name: "Top Tipster",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100",
      description: "Spécialiste des paris sportifs",
      subscribers: 980,
      rating: 4.6
    },
    {
      id: 3,
      name: "Football Tips",
      image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100",
      description: "Les meilleurs pronostics football",
      subscribers: 750,
      rating: 4.5
    }
  ];

  const handleOpenBetModal = (match: any) => {
    setSelectedMatch(match);
    setIsBetModalOpen(true);
  };

  const handleCreatePost = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    setShowCreatePost(true);
  };

  return (
    <div className="space-y-6">
      {/* Channels Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Canaux populaires</h2>
          <Link to="/channels" className="text-blue-600 hover:text-blue-800 flex items-center">
            Voir tout
            <ChevronRight className="h-5 w-5" />
          </Link>
        </div>
        <div className="flex overflow-x-auto gap-4 pb-4 hide-scrollbar">
          {channels.map(channel => (
            <Link
              key={channel.id}
              to={`/channels`}
              className="flex-shrink-0 w-48 bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="p-4">
                <img
                  src={channel.image}
                  alt={channel.name}
                  className="w-16 h-16 rounded-full mx-auto mb-3 object-cover"
                />
                <h3 className="font-semibold text-center mb-1">{channel.name}</h3>
                <p className="text-sm text-gray-500 text-center truncate">{channel.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
      
      <div className="space-y-6">
        {posts.map((post, index) => {
          if (posts.length === index + 1) {
            return (
              <div ref={lastPostElementRef} key={post.id}>
                <Post 
                  post={post}
                  onOpenBetModal={handleOpenBetModal}
                />
              </div>
            );
          } else {
            return (
              <Post 
                key={post.id} 
                post={post}
                onOpenBetModal={handleOpenBetModal}
              />
            );
          }
        })}
        
        {loading && (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        )}
        
        {!loading && !hasMore && (
          <p className="text-center text-gray-500">Plus aucun pronostic à afficher</p>
        )}
      </div>

      <EnergyDrinkAd className="w-full" />

      {/* Floating Create Button */}
      <button
        onClick={handleCreatePost}
        className="fixed bottom-20 right-4 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors z-40 flex items-center justify-center"
      >
        <Plus className="h-6 w-6" />
      </button>

      {selectedMatch && (
        <Bet
          isOpen={isBetModalOpen}
          onClose={() => setIsBetModalOpen(false)}
          prediction={selectedMatch}
        />
      )}

      {showCreatePost && user && (
        <CreatePost />
      )}
    </div>
  );
}