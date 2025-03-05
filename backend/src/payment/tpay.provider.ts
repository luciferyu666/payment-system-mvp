import { Injectable } from "@nestjs/common";
import { PaymentProvider } from "./payment.interface";
import { HttpService } from "@nestjs/axios";
import { firstValueFrom } from "rxjs";

@Injectable()
export class TPayProvider implements PaymentProvider {
  constructor(private readonly httpService: HttpService) {}

  async createTransaction(amount: number, orderId: string) {
    const response = await firstValueFrom(
      this.httpService.post("https://api.tpay.com/transaction", {
        amount,
        orderId,
      })
    );

    return {
      transactionId: response.data.transactionId,
      status: response.data.status,
    };
  }
}
