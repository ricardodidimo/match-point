import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCourtDto } from './dto/create-court.dto';
import { UpdateCourtDto } from './dto/update-court.dto';

@Injectable()
export class CourtsService {
  constructor(private readonly prisma: PrismaService) {}

  async createCourt(data: CreateCourtDto) {
    return this.prisma.court.create({ data });
  }

  async getCourtById(id: number) {
    const court = await this.prisma.court.findUnique({ where: { id } });
    if (!court) throw new NotFoundException('Court not found');
    return court;
  }

  async updateCourt(id: number, data: UpdateCourtDto) {
    return this.prisma.court.update({
      where: { id },
      data,
    });
  }

  async deleteCourt(id: number) {
    return this.prisma.court.delete({ where: { id } });
  }

  async getAllCourts() {
    return this.prisma.court.findMany();
  }
}