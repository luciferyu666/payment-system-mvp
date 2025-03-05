import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { UserModule } from "../user/user.module";
import { ConfigModule, ConfigService } from "@nestjs/config";

@Module({
  imports: [
    ConfigModule,
    UserModule, // 引入 User 模組，讓 Auth 模組能存取用戶資料
    PassportModule.register({ defaultStrategy: "jwt" }), // 設定 Passport.js 使用 JWT
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>("JWT_SECRET"), // 讀取環境變數中的 JWT_SECRET
        signOptions: { expiresIn: "1h" }, // 設定 JWT 1 小時過期
      }),
    }),
  ],
  controllers: [AuthController], // 註冊 Auth API 控制器
  providers: [AuthService, JwtStrategy], // 設定 AuthService 與 JWT 策略
  exports: [AuthService], // 允許其他模組使用 AuthService
})
export class AuthModule {}
