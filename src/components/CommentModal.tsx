import React, { useState, useEffect } from 'react';
import { X, Send, ThumbsUp, Reply, MoreVertical } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';

interface Comment {
  id: string;
  content: string;
  created_at: string;
  likes: number;
  username: string;
  avatar_url: string;
  isLiked?: boolean;
}

interface CommentModalProps {
  isOpen: boolean;
  onClose: () => void;
  postId: string;
}

export default function CommentModal({ isOpen, onClose, postId }: CommentModalProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (isOpen) {
      fetchComments();
    }
  }, [isOpen, postId]);

  const fetchComments = async () => {
    try {
      const { data: commentsData, error } = await supabase
        .from('comment_details')
        .select('*')
        .eq('post_id', postId)
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Fetch likes for each comment if user is authenticated
      if (user) {
        const commentsWithLikes = await Promise.all(
          commentsData.map(async (comment) => {
            const { data: likeData } = await supabase
              .from('comment_likes')
              .select()
              .eq('comment_id', comment.id)
              .eq('user_id', user.id)
              .maybeSingle();

            return {
              ...comment,
              isLiked: !!likeData
            };
          })
        );
        setComments(commentsWithLikes);
      } else {
        setComments(commentsData);
      }
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !newComment.trim()) return;

    setLoading(true);
    try {
      const { error } = await supabase
        .from('comments')
        .insert([
          {
            post_id: postId,
            user_id: user.id,
            content: newComment.trim()
          }
        ]);

      if (error) throw error;

      setNewComment('');
      fetchComments();

      // Update the post's comment count
      await supabase
        .from('posts')
        .update({ comments: comments.length + 1 })
        .eq('id', postId);

    } catch (error) {
      console.error('Error posting comment:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async (commentId: string, isLiked: boolean) => {
    if (!user) return;

    try {
      if (isLiked) {
        await supabase
          .from('comment_likes')
          .delete()
          .eq('comment_id', commentId)
          .eq('user_id', user.id);
      } else {
        await supabase
          .from('comment_likes')
          .insert([
            {
              comment_id: commentId,
              user_id: user.id
            }
          ]);
      }

      // Update the comments state immediately for better UX
      setComments(prevComments =>
        prevComments.map(comment =>
          comment.id === commentId
            ? {
                ...comment,
                likes: isLiked ? comment.likes - 1 : comment.likes + 1,
                isLiked: !isLiked
              }
            : comment
        )
      );
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
      <div className="fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-lg font-semibold">Commentaires ({comments.length})</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Comments List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {comments.map(comment => (
            <div key={comment.id} className="flex space-x-3">
              <img
                src={comment.avatar_url}
                alt={comment.username}
                className="w-8 h-8 rounded-full"
              />
              <div className="flex-1">
                <div className="bg-gray-100 rounded-lg p-3">
                  <div className="flex justify-between items-start">
                    <span className="font-semibold">{comment.username}</span>
                    <button className="text-gray-500">
                      <MoreVertical className="h-4 w-4" />
                    </button>
                  </div>
                  <p className="text-gray-700 mt-1">{comment.content}</p>
                </div>
                <div className="flex items-center space-x-4 mt-2 text-sm">
                  <button
                    onClick={() => handleLike(comment.id, comment.isLiked || false)}
                    className={`flex items-center space-x-1 ${
                      comment.isLiked ? 'text-red-500' : 'text-gray-500'
                    }`}
                  >
                    <ThumbsUp className={`h-4 w-4 ${comment.isLiked ? 'fill-current' : ''}`} />
                    <span>{comment.likes}</span>
                  </button>
                  <button className="flex items-center space-x-1 text-gray-500">
                    <Reply className="h-4 w-4" />
                    <span>Répondre</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Comment Input */}
        <form onSubmit={handleSubmit} className="p-4 border-t">
          <div className="flex space-x-2">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Écrire un commentaire..."
              className="flex-1 border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading || !newComment.trim()}
              className="bg-blue-600 text-white rounded-full p-2 hover:bg-blue-700 disabled:opacity-50"
            >
              <Send className="h-5 w-5" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}