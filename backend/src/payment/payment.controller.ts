import { Controller, Post, Get, Param, Body } from "@nestjs/common";
import { PaymentService } from "./payment.service";

@Controller("payments")
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  async createPayment(
    @Body()
    createPaymentDto: {
      provider: string;
      amount: number;
      orderId: string;
    }
  ) {
    return this.paymentService.createPayment(
      createPaymentDto.provider,
      createPaymentDto.amount,
      createPaymentDto.orderId
    );
  }

  @Get(":id")
  async getPaymentStatus(@Param("id") transactionId: string) {
    return this.paymentService.getPaymentStatus(transactionId);
  }
}
