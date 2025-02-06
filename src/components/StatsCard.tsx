import { motion } from 'framer-motion';
import { cn } from '../lib/utils';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  className?: string;
}

export function StatsCard({ title, value, icon, className }: StatsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        'relative overflow-hidden rounded-xl bg-secondary/10 p-6 backdrop-blur-lg',
        'border border-white/10 shadow-lg',
        'transition-all duration-300 hover:shadow-accent/20 hover:border-accent/50',
        className
      )}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-400">{title}</p>
          <p className="mt-2 text-2xl font-semibold text-white">{value}</p>
        </div>
        <div className="text-accent">{icon}</div>
      </div>
      <div className="absolute -right-2 -top-2 h-24 w-24 rounded-full bg-accent/5 blur-2xl" />
    </motion.div>
  );
}