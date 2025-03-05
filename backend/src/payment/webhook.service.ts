import { Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { firstValueFrom } from "rxjs";

@Injectable()
export class WebhookService {
  constructor(private readonly httpService: HttpService) {}

  async verifyWebhookSignature(
    payload: any,
    signature: string
  ): Promise<boolean> {
    // HMAC 驗證 (假設金流提供者使用 HMAC 簽章)
    const secret = process.env.WEBHOOK_SECRET;
    const crypto = require("crypto");
    const computedSignature = crypto
      .createHmac("sha256", secret)
      .update(JSON.stringify(payload))
      .digest("hex");

    return computedSignature === signature;
  }

  async retryWebhook(url: string, payload: any, maxRetries = 3) {
    for (let i = 0; i < maxRetries; i++) {
      try {
        await firstValueFrom(this.httpService.post(url, payload));
        return;
      } catch (error) {
        console.error(`Webhook 發送失敗，重試 ${i + 1}/${maxRetries}`);
      }
    }
  }
}
