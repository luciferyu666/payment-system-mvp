import { Injectable } from "@nestjs/common";
import { PaymentRepository } from "./payment.repository";
import { PaymentProvider } from "./providers/payment.interface";
import { KPayProvider } from "./providers/kpay.provider";
import { TPayProvider } from "./providers/tpay.provider";

@Injectable()
export class PaymentService {
  private providers: { [key: string]: PaymentProvider };

  constructor(
    private readonly paymentRepository: PaymentRepository,
    private readonly kpayProvider: KPayProvider,
    private readonly tpayProvider: TPayProvider
  ) {
    // 註冊不同的金流提供者
    this.providers = {
      kpay: this.kpayProvider,
      tpay: this.tpayProvider,
    };
  }

  async createPayment(provider: string, amount: number, orderId: string) {
    const paymentProvider = this.providers[provider];
    if (!paymentProvider) {
      throw new Error("不支援的金流提供者");
    }

    const transaction = await paymentProvider.createTransaction(
      amount,
      orderId
    );
    return this.paymentRepository.saveTransaction(transaction);
  }

  async getPaymentStatus(transactionId: string) {
    return this.paymentRepository.getTransactionById(transactionId);
  }
}
