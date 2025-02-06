import React from 'react';
import { QueryClient, QueryClientProvider, useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Scrollbars } from 'react-custom-scrollbars-2';
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Calendar,
  AlertCircle,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  CreditCard,
  PlusCircle,
  MinusCircle,
  Wallet,
} from 'lucide-react';

import { TokenInput } from './components/TokenInput';
import { StatsCard } from './components/StatsCard';
import { Chart } from './components/Chart';
import { LoadingOverlay } from './components/LoadingOverlay';
import { formatCurrency, formatDate } from './lib/utils';
import type { StatsResponse } from './types';
import { StatsInsights } from './components/StatsInsights';

const queryClient = new QueryClient();

function CustomScrollbars({ children }: { children: React.ReactNode }) {
  return (
    <Scrollbars
      autoHide
      renderThumbVertical={({ style, ...props }) => (
        <div
          {...props}
          style={{
            ...style,
            backgroundColor: '#6C5CE7',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        />
      )}
      renderTrackVertical={({ style, ...props }) => (
        <div
          {...props}
          style={{
            ...style,
            right: 2,
            bottom: 2,
            top: 2,
            borderRadius: '5px',
            backgroundColor: 'rgba(20, 22, 48, 0.2)',
          }}
        />
      )}
    >
      {children}
    </Scrollbars>
  );
}

function StatsAnalyzer() {
  const { mutate, data, isLoading, error } = useMutation({
    mutationFn: async (token: string) => {
      const response = await axios.post<StatsResponse>(
        'http://localhost:8000/api/stats',
        { token }
      );
      return response.data;
    },
  });

  const profitLoss = React.useMemo(() => {
    if (!data) return 0;
    return data.payments.total_amount - data.withdrawals.total_amount;
  }, [data]);

  const paymentMethodsChartData = React.useMemo(() => {
    if (!data) return null;

    const methods = Object.entries(data.payments.payment_methods);
    return {
      labels: methods.map(([method]) => method),
      datasets: [
        {
          label: 'Amount',
          data: methods.map(([, stats]) => stats.amount),
          backgroundColor: '#6C5CE7',
          borderColor: '#6C5CE7',
        },
        {
          label: 'Count',
          data: methods.map(([, stats]) => stats.count),
          backgroundColor: '#00D2D3',
          borderColor: '#00D2D3',
        },
      ],
    };
  }, [data]);

  const withdrawalMethodsChartData = React.useMemo(() => {
    if (!data) return null;

    const methods = Object.entries(data.withdrawals.methods);
    return {
      labels: methods.map(([method]) => method),
      datasets: [
        {
          label: 'Amount',
          data: methods.map(([, stats]) => stats.amount),
          backgroundColor: '#00B894',
          borderColor: '#00B894',
        },
        {
          label: 'Count',
          data: methods.map(([, stats]) => stats.count),
          backgroundColor: '#FF6B6B',
          borderColor: '#FF6B6B',
        },
      ],
    };
  }, [data]);

  return (
    <div className="h-screen bg-primary text-white overflow-hidden">
      <CustomScrollbars>
        <div className="p-8">
          <div className="max-w-7xl mx-auto space-y-8">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <h1 className="text-4xl font-bold mb-2">6CS.fail Stats Analyzer</h1>
              <p className="text-gray-400">Enter your token to analyze your statistics</p>
            </motion.div>

            <TokenInput onSubmit={mutate} isLoading={isLoading} />

            {error && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-red-500/20 border border-red-500/50 rounded-lg p-4 text-center text-red-300"
              >
                <AlertCircle className="inline-block mr-2" />
                Failed to fetch stats. Please try again.
              </motion.div>
            )}

            {data && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-8"
              >
                {/* Overview Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <StatsCard
                    title="Total Payments"
                    value={formatCurrency(data.payments.total_amount)}
                    icon={<Wallet className="text-success" />}
                  />
                  <StatsCard
                    title="Total Withdrawals"
                    value={formatCurrency(data.withdrawals.total_amount)}
                    icon={<CreditCard className="text-error" />}
                  />
                  <StatsCard
                    title="Profit/Loss"
                    value={formatCurrency(Math.abs(data.payments.total_amount - data.withdrawals.total_amount))}
                    icon={<PlusCircle className="text-success" />}
                    className="border-success/30"
                  />
                </div>

                {/* Statistical Insights */}
                <StatsInsights data={data} />

                {/* Detailed Stats */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Payment Stats */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                  >
                    <div className="bg-secondary/10 backdrop-blur-lg rounded-xl p-6 border border-white/10">
                      <h2 className="text-xl font-semibold mb-4">Payment Statistics</h2>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-400">Average Payment</p>
                          <p className="font-medium">{formatCurrency(data.payments.average_payment)}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-400">Total Bonus</p>
                          <p className="font-medium">{formatCurrency(data.payments.total_bonus)}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-400">Minimum Payment</p>
                          <p className="font-medium">{formatCurrency(data.payments.min_payment)}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-400">Maximum Payment</p>
                          <p className="font-medium">{formatCurrency(data.payments.max_payment)}</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-secondary/10 backdrop-blur-lg rounded-xl p-6 border border-white/10">
                      <h2 className="text-xl font-semibold mb-4">Payment Methods</h2>
                      {paymentMethodsChartData && <Chart data={paymentMethodsChartData} />}
                    </div>
                  </motion.div>

                  {/* Withdrawal Stats */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                  >
                    <div className="bg-secondary/10 backdrop-blur-lg rounded-xl p-6 border border-white/10">
                      <h2 className="text-xl font-semibold mb-4">Withdrawal Statistics</h2>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-400">Average Withdrawal</p>
                          <p className="font-medium">{formatCurrency(data.withdrawals.average_withdrawal)}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-400">Total Successful</p>
                          <p className="font-medium">{data.withdrawals.successful}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-400">Minimum Withdrawal</p>
                          <p className="font-medium">{formatCurrency(data.withdrawals.min_withdrawal)}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-400">Maximum Withdrawal</p>
                          <p className="font-medium">{formatCurrency(data.withdrawals.max_withdrawal)}</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-secondary/10 backdrop-blur-lg rounded-xl p-6 border border-white/10">
                      <h2 className="text-xl font-semibold mb-4">Withdrawal Methods</h2>
                      {withdrawalMethodsChartData && <Chart data={withdrawalMethodsChartData} />}
                    </div>
                  </motion.div>
                </div>

                {/* Timeline */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-secondary/10 backdrop-blur-lg rounded-xl p-6 border border-white/10"
                >
                  <h2 className="text-xl font-semibold mb-4">Activity Timeline</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium text-accent mb-2">Payments</h3>
                      <div className="flex items-center gap-4">
                        <Clock className="text-accent" />
                        <div>
                          <p className="text-sm text-gray-400">First Payment</p>
                          <p className="font-medium">
                            {formatDate(data.payments.first_payment_date)}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <Clock className="text-accent" />
                        <div>
                          <p className="text-sm text-gray-400">Last Payment</p>
                          <p className="font-medium">
                            {formatDate(data.payments.last_payment_date)}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium text-accent mb-2">Withdrawals</h3>
                      <div className="flex items-center gap-4">
                        <Clock className="text-accent" />
                        <div>
                          <p className="text-sm text-gray-400">First Withdrawal</p>
                          <p className="font-medium">
                            {formatDate(data.withdrawals.first_withdrawal_date)}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <Clock className="text-accent" />
                        <div>
                          <p className="text-sm text-gray-400">Last Withdrawal</p>
                          <p className="font-medium">
                            {formatDate(data.withdrawals.last_withdrawal_date)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </div>
        </div>
      </CustomScrollbars>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <StatsAnalyzer />
    </QueryClientProvider>
  );
}

export default App;