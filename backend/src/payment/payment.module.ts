import { Module } from "@nestjs/common";
import { PaymentService } from "./payment.service";
import { PaymentController } from "./payment.controller";
import { PaymentRepository } from "./payment.repository";
import { KPayProvider } from "./providers/kpay.provider";
import { TPayProvider } from "./providers/tpay.provider";
import { WebhookService } from "./webhook.service";
import { HttpModule } from "@nestjs/axios";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Payment } from "./entities/payment.entity";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
    ConfigModule, // 加載環境變數 (金流 API Key)
    HttpModule, // 支援 HTTP 請求 (金流 API 介接)
    TypeOrmModule.forFeature([Payment]), // 註冊 Payment 實體 (交易紀錄)
  ],
  controllers: [PaymentController], // 註冊 Payment API 控制器
  providers: [
    PaymentService, // 主要金流服務
    PaymentRepository, // 金流資料庫操作
    KPayProvider, // 客樂得 API 介接
    TPayProvider, // 台灣里 API 介接
    WebhookService, // Webhook 驗證與處理
  ],
  exports: [PaymentService], // 允許其他模組使用 PaymentService
})
export class PaymentModule {}
