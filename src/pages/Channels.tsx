import React, { useState } from 'react';
import { MessageCircle, Star, Send } from 'lucide-react';

interface Channel {
  id: number;
  name: string;
  image: string;
  description: string;
  subscribers: number;
  rating: number;
  messages?: Message[];
}

interface Message {
  id: number;
  user: {
    name: string;
    image: string;
  };
  text: string;
  timestamp: string;
}

export default function Channels() {
  const [selectedChannel, setSelectedChannel] = useState<Channel | null>(null);
  const [messageText, setMessageText] = useState('');

  const channels: Channel[] = [
    {
      id: 1,
      name: "Expert Pronos",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100",
      description: "Analyses détaillées et pronostics de football",
      subscribers: 1250,
      rating: 4.8,
      messages: [
        {
          id: 1,
          user: {
            name: "Expert Pronos",
            image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100",
          },
          text: "Bonjour à tous ! Voici mon analyse pour le match PSG vs Barcelone ce soir...",
          timestamp: "14:30"
        },
        {
          id: 2,
          user: {
            name: "Jean D.",
            image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100",
          },
          text: "Merci pour l'analyse ! Que pensez-vous des corners ?",
          timestamp: "14:35"
        }
      ]
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

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageText.trim()) return;
    
    // Here you would typically send the message to your backend
    console.log('Sending message:', messageText);
    setMessageText('');
  };

  return (
    <div className="flex h-[calc(100vh-180px)] gap-4">
      {/* Channels List */}
      <div className="w-full md:w-1/3 bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-4 border-b">
          <h2 className="text-xl font-bold">Canaux</h2>
        </div>
        <div className="overflow-y-auto h-[calc(100%-60px)]">
          {channels.map(channel => (
            <div
              key={channel.id}
              onClick={() => setSelectedChannel(channel)}
              className={`p-4 flex items-center gap-4 hover:bg-gray-50 cursor-pointer transition-colors ${
                selectedChannel?.id === channel.id ? 'bg-gray-50' : ''
              }`}
            >
              <img
                src={channel.image}
                alt={channel.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold truncate">{channel.name}</h3>
                <p className="text-sm text-gray-500 truncate">{channel.description}</p>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MessageCircle className="h-4 w-4" />
                  <span>{channel.subscribers}</span>
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span>{channel.rating}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      {selectedChannel ? (
        <div className="hidden md:flex flex-col flex-1 bg-white rounded-lg shadow-md overflow-hidden">
          {/* Chat Header */}
          <div className="p-4 border-b flex items-center gap-4">
            <img
              src={selectedChannel.image}
              alt={selectedChannel.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <h2 className="font-bold">{selectedChannel.name}</h2>
              <p className="text-sm text-gray-500">{selectedChannel.subscribers} abonnés</p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {selectedChannel.messages?.map(message => (
              <div key={message.id} className="flex items-start gap-3">
                <img
                  src={message.user.image}
                  alt={message.user.name}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">{message.user.name}</span>
                    <span className="text-xs text-gray-500">{message.timestamp}</span>
                  </div>
                  <p className="text-gray-700">{message.text}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Message Input */}
          <form onSubmit={handleSendMessage} className="p-4 border-t">
            <div className="flex gap-2">
              <input
                type="text"
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                placeholder="Écrivez votre message..."
                className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="hidden md:flex flex-1 items-center justify-center bg-white rounded-lg shadow-md">
          <div className="text-center text-gray-500">
            <MessageCircle className="h-12 w-12 mx-auto mb-2" />
            <p>Sélectionnez un canal pour commencer la discussion</p>
          </div>
        </div>
      )}
    </div>
  );
}