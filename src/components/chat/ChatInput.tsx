'use client';

import { useState } from 'react';
import { Camera, Smile, Gift, Plus, Mic, Send } from 'lucide-react';

interface ChatInputProps {
  onSend: (message: string) => void;
  placeholder?: string;
}

export default function ChatInput({ onSend, placeholder = 'Aa' }: ChatInputProps) {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim()) {
      onSend(message);
      setMessage('');
    }
  };

  return (
    <div className="flex items-center gap-2 p-4 bg-white border-t border-gray-100">
      {/* Camera button */}
      <button className="w-10 h-10 flex items-center justify-center text-gray-500">
        <Camera size={22} />
      </button>

      {/* Input field */}
      <div className="flex-1 flex items-center gap-2 bg-gray-100 rounded-full px-4 py-2">
        <input
          type="text"
          placeholder={placeholder}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          className="flex-1 bg-transparent text-sm placeholder:text-gray-400 focus:outline-none"
        />
        <button className="text-gray-400">
          <Smile size={20} />
        </button>
      </div>

      {/* Action buttons */}
      <div className="flex items-center gap-1">
        <button className="w-10 h-10 flex items-center justify-center text-gray-500">
          <span className="text-xs font-bold border border-gray-300 rounded px-1">GIF</span>
        </button>
        <button className="w-10 h-10 flex items-center justify-center text-gray-500">
          <span className="text-lg font-medium">99</span>
        </button>
        <button className="w-10 h-10 flex items-center justify-center text-gray-500">
          <Plus size={20} />
        </button>
        <button className="w-10 h-10 flex items-center justify-center text-gray-500">
          <Mic size={20} />
        </button>
      </div>
    </div>
  );
}
