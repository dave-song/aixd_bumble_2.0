'use client';

import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { PhoneFrame, StatusBar } from '@/components/layout';
import { ChatBubble, ChatInput, BeelineModal } from '@/components/chat';
import { profiles, matches } from '@/lib/mockData';
import { ChevronLeft, Phone, Video, MoreVertical, Clock } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  isOwn: boolean;
  delivered?: boolean;
}

export default function ChatDetailPage() {
  const router = useRouter();
  const params = useParams();
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', text: 'Hey!', isOwn: true, delivered: true },
  ]);
  const [showBeelineModal, setShowBeelineModal] = useState(false);

  const match = matches.find((m) => m.profile.id === params.id);
  const profile = match?.profile || profiles.find((p) => p.id === params.id) || profiles[0];

  const handleBack = () => {
    router.push('/chats');
  };

  const handleSendMessage = (text: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      isOwn: true,
      delivered: true,
    };
    setMessages([...messages, newMessage]);
  };

  const toggleBeelineModal = () => {
    setShowBeelineModal(!showBeelineModal);
  };

  return (
    <PhoneFrame>
      <div className="h-full flex flex-col bg-white">
        <StatusBar />

        {/* Header */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-100">
          <button onClick={handleBack}>
            <ChevronLeft size={24} className="text-gray-600" />
          </button>
          
          <div className="w-10 h-10 rounded-full overflow-hidden">
            <img
              src={profile.photos[0]}
              alt={profile.name}
              className="w-full h-full object-cover"
            />
          </div>
          
          <span className="flex-1 font-semibold text-black">{profile.name}</span>
          
          <div className="flex items-center gap-2">
            <button onClick={toggleBeelineModal}>
              <Phone size={22} className="text-gray-600" />
            </button>
            <button>
              <Video size={22} className="text-gray-600" />
            </button>
            <button>
              <MoreVertical size={22} className="text-gray-600" />
            </button>
          </div>
        </div>

        {/* Opening move */}
        {profile.openingMove && (
          <div className="mx-4 mt-4 p-3 bg-gray-100 rounded-xl">
            <p className="text-xs font-semibold text-gray-500 mb-1">
              {profile.name}'s Opening Move
            </p>
            <p className="text-sm text-gray-800">
              {profile.openingMove}
            </p>
          </div>
        )}

        {/* Messages */}
        <div className="flex-1 overflow-auto p-4 space-y-4">
          {/* Date separator */}
          <div className="text-center">
            <span className="text-xs text-gray-400">Today</span>
          </div>

          {messages.map((message) => (
            <ChatBubble
              key={message.id}
              message={message.text}
              isOwn={message.isOwn}
              delivered={message.delivered}
            />
          ))}
        </div>

        {/* Beeline Modal */}
        <BeelineModal
          isOpen={showBeelineModal}
          onClose={() => setShowBeelineModal(false)}
          onCall={() => console.log('Calling Beeline...')}
        />

        {/* Timer notice */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-4 mb-2 p-3 bg-gray-50 rounded-xl flex items-center gap-3"
        >
          <div className="flex-1">
            <p className="text-sm font-medium text-black">
              They have 24 hours to reply
            </p>
            <p className="text-xs text-gray-500">
              It's their turn to message you back
            </p>
          </div>
          <Clock size={24} className="text-gray-400" />
        </motion.div>

        {/* Message input */}
        <ChatInput onSend={handleSendMessage} />
      </div>
    </PhoneFrame>
  );
}
