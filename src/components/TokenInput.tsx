import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';

interface TokenInputProps {
  onSubmit: (token: string) => void;
  isLoading: boolean;
}

export function TokenInput({ onSubmit, isLoading }: TokenInputProps) {
  const [token, setToken] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (token.trim()) {
      onSubmit(token.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-xl mx-auto">
      <div className="relative flex items-center">
        <input
          type="text"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          placeholder="Enter your token"
          className="w-full px-6 py-4 bg-secondary/20 border border-white/10 rounded-lg
                   text-white placeholder-gray-400 focus:outline-none focus:ring-2
                   focus:ring-accent/50 transition-all duration-300"
          disabled={isLoading}
        />
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={isLoading || !token.trim()}
          className="absolute right-3 h-[calc(100%-12px)] px-6
                   bg-accent text-white rounded-md flex items-center gap-2
                   hover:bg-accent/90 transition-colors duration-300 shadow-lg
                   disabled:opacity-50 disabled:cursor-not-allowed
                   disabled:hover:bg-accent"
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              <Search size={20} />
              <span className="font-medium">Analyze</span>
            </>
          )}
        </motion.button>
      </div>
    </form>
  );
}