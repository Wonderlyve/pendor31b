import React, { useState } from 'react';
import { Star, MessageCircle, Share2, ThumbsUp, Calendar, Clock, Trophy } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import CommentModal from './CommentModal';

interface PostProps {
  post: {
    id: string;
    content: string;
    image_url: string | null;
    odds: number;
    confidence: number;
    created_at: string;
    likes: number;
    comments: number;
    shares: number;
    user: {
      username: string;
      avatar_url: string;
    };
    isLiked?: boolean;
  };
  onOpenBetModal: (prediction: any) => void;
}

const MAX_CHARS = 200;

export default function Post({ post, onOpenBetModal }: PostProps) {
  const [expanded, setExpanded] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [localPost, setLocalPost] = useState(post);
  const { user } = useAuth();
  const shouldTruncate = post.content.length > MAX_CHARS;
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString('fr-FR'),
      time: date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
    };
  };

  const { date, time } = formatDate(post.created_at);

  const handleLike = async () => {
    if (!user) return;

    try {
      if (localPost.isLiked) {
        await supabase
          .from('post_likes')
          .delete()
          .eq('post_id', localPost.id)
          .eq('user_id', user.id);

        setLocalPost(prev => ({
          ...prev,
          likes: prev.likes - 1,
          isLiked: false
        }));
      } else {
        await supabase
          .from('post_likes')
          .insert([
            {
              post_id: localPost.id,
              user_id: user.id
            }
          ]);

        setLocalPost(prev => ({
          ...prev,
          likes: prev.likes + 1,
          isLiked: true
        }));
      }
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      {/* Post Header */}
      <div className="p-4 flex items-center space-x-3">
        <img 
          src={post.user.avatar_url}
          alt={post.user.username}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <div className="flex items-center space-x-2">
            <h3 className="font-semibold">{post.user.username}</h3>
          </div>
          <div className="text-sm text-gray-500 flex items-center space-x-2">
            <Calendar className="h-4 w-4" />
            <span>{date}</span>
            <Clock className="h-4 w-4" />
            <span>{time}</span>
          </div>
        </div>
      </div>

      {/* Post Content */}
      <div className="px-4 pb-3">
        <p className="text-gray-800 mb-2 text-sm whitespace-pre-line">
          {expanded ? localPost.content : `${localPost.content.slice(0, MAX_CHARS)}${shouldTruncate ? '...' : ''}`}
        </p>
        {shouldTruncate && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-blue-600 hover:text-blue-800 text-sm"
          >
            {expanded ? 'Voir moins' : 'Lire la suite'}
          </button>
        )}
        <div className="flex items-center space-x-2 text-sm text-gray-600 mb-3 mt-2">
          <span>Côte totale:</span>
          <span className="px-2 py-1 bg-gray-100 rounded">{localPost.odds}</span>
        </div>
      </div>

      {/* Post Image */}
      {localPost.image_url && (
        <div className="aspect-video relative">
          <img 
            src={localPost.image_url} 
            alt="Post"
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Prediction Info */}
      <div className="p-4 border-t">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <Trophy className="h-5 w-5 text-accent" />
            <span className="font-medium">Confiance</span>
          </div>
          <span className="text-green-600 font-medium">{localPost.confidence}%</span>
        </div>

        {/* Social Actions */}
        <div className="flex items-center justify-between pt-3 border-t">
          <button 
            onClick={handleLike}
            className={`flex items-center space-x-1 ${
              localPost.isLiked ? 'text-red-500' : 'text-gray-600 hover:text-red-500'
            }`}
          >
            <ThumbsUp className={`h-5 w-5 ${localPost.isLiked ? 'fill-current' : ''}`} />
            <span>{localPost.likes}</span>
          </button>
          <button 
            onClick={() => setShowComments(true)}
            className="flex items-center space-x-1 text-gray-600 hover:text-blue-600"
          >
            <MessageCircle className="h-5 w-5" />
            <span>{localPost.comments}</span>
          </button>
          <button className="flex items-center space-x-1 text-gray-600 hover:text-blue-600">
            <Share2 className="h-5 w-5" />
            <span>{localPost.shares}</span>
          </button>
          <button 
            onClick={() => onOpenBetModal(localPost)}
            className="bg-blue-600 text-white px-4 py-1 rounded-full hover:bg-blue-700 transition-colors"
          >
            Voir les paris
          </button>
        </div>
      </div>

      {/* Comments Modal */}
      <CommentModal
        isOpen={showComments}
        onClose={() => setShowComments(false)}
        postId={localPost.id}
      />
    </div>
  );
}