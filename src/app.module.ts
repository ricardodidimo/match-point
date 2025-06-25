import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { CourtsModule } from './courts/courts.module';
import { RentalsModule } from './rentals/rentals.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    AuthModule, 
    UsersModule,
    CourtsModule,
    RentalsModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
  ],
})
export class AppModule {}
