export interface PaymentProvider {
  createTransaction(
    amount: number,
    orderId: string
  ): Promise<{ transactionId: string; status: string }>;
}
