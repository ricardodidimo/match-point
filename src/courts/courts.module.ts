import { Module } from '@nestjs/common';
import { CourtsController } from './courts.controller';
import { CourtsService } from './courts.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  controllers: [CourtsController],
  providers: [CourtsService],
  imports: [PrismaModule],
  exports: [CourtsService],
})
export class CourtsModule {}
