import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function calculateSuccessRate(success: number, failed: number): number {
  const total = success + failed;
  return total === 0 ? 0 : (success / total) * 100;
}

export function calculateDailyAverage(amount: number, firstDate: string, lastDate: string): number {
  const start = new Date(firstDate);
  const end = new Date(lastDate);
  const days = Math.max(1, Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)));
  return amount / days;
}

export function getActivityPeriod(firstDate: string, lastDate: string): string {
  const start = new Date(firstDate);
  const end = new Date(lastDate);
  const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  const months = Math.floor(days / 30);
  const remainingDays = days % 30;
  
  if (months === 0) return `${days} days`;
  return `${months} months${remainingDays > 0 ? ` and ${remainingDays} days` : ''}`;
}