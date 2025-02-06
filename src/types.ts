export interface PaymentMethod {
  count: number;
  amount: number;
}

export interface PaymentStats {
  total_amount: number;
  total_bonus: number;
  successful_payments: number;
  failed_payments: number;
  first_payment_date: string;
  last_payment_date: string;
  average_payment: number;
  max_payment: number;
  min_payment: number;
  payment_methods: Record<string, PaymentMethod>;
}

export interface WithdrawalStats {
  total_amount: number;
  successful: number;
  failed: number;
  first_withdrawal_date: string;
  last_withdrawal_date: string;
  average_withdrawal: number;
  max_withdrawal: number;
  min_withdrawal: number;
  methods: Record<string, PaymentMethod>;
}

export interface StatsResponse {
  payments: PaymentStats;
  withdrawals: WithdrawalStats;
}