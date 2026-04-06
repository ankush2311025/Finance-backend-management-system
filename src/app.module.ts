import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { RecordsModule } from './records/records.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { InsightsModule } from './insights/insights.module';
import { ConfigModule } from '@nestjs/config';
import * as dotenv from 'dotenv';
dotenv.config();
 
@Module({ 
  imports: [
    ConfigModule.forRoot({
          isGlobal : true
        }),
    JwtModule.register({
      secret: 'process.env.JWT_SERCRET',
      signOptions : { expiresIn: '1d'  }
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERM_NAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true, 
      synchronize: true, 
    }),
    AuthModule, 
    UsersModule, 
    RecordsModule, 
    DashboardModule, 
    InsightsModule,
  ],
  
  controllers: [],
  providers: [],
})
export class AppModule {}
