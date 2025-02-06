import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Info, CreditCard, Wallet } from 'lucide-react';
import { formatCurrency, calculateDailyAverage, getActivityPeriod } from '../lib/utils';
import type { StatsResponse } from '../types';

interface StatsInsightsProps {
  data: StatsResponse;
}

export function StatsInsights({ data }: StatsInsightsProps) {
  const profitLoss = Math.abs(data.payments.total_amount - data.withdrawals.total_amount);
  const dailyPaymentAvg = calculateDailyAverage(
    data.payments.total_amount,
    data.payments.first_payment_date,
    data.payments.last_payment_date
  );
  const dailyWithdrawalAvg = calculateDailyAverage(
    data.withdrawals.total_amount,
    data.withdrawals.first_withdrawal_date,
    data.withdrawals.last_withdrawal_date
  );
  const activityPeriod = getActivityPeriod(
    data.payments.first_payment_date,
    data.payments.last_payment_date
  );

  const insights = [
    {
      title: 'Activity Overview',
      content: `Active for ${activityPeriod} with a profit of ${formatCurrency(profitLoss)}`,
      icon: <TrendingUp className="text-success" />,
      color: 'text-success'
    },
    {
      title: 'Daily Averages',
      content: `Average daily payment: ${formatCurrency(dailyPaymentAvg)} | Average daily withdrawal: ${formatCurrency(dailyWithdrawalAvg)}`,
      icon: <Info className="text-accent" />,
      color: 'text-accent'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-secondary/10 backdrop-blur-lg rounded-xl p-6 border border-white/10"
    >
      <h2 className="text-xl font-semibold mb-4">Statistical Insights</h2>
      <div className="space-y-4">
        {insights.map((insight, index) => (
          <motion.div
            key={insight.title}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-start gap-4 p-4 rounded-lg bg-white/5"
          >
            <div className="mt-1">{insight.icon}</div>
            <div>
              <h3 className="font-medium mb-1">{insight.title}</h3>
              <p className={`text-sm ${insight.color}`}>{insight.content}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}