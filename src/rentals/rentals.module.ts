import { Module } from '@nestjs/common';
import { RentalsController } from './rentals.controller';
import { RentalsService } from './rentals.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  controllers: [RentalsController],
  providers: [RentalsService],
  imports: [PrismaModule],
})
export class RentalsModule {}
