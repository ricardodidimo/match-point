import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRentalDto } from './dto/create-rental.dto';
import { UpdateRentalDto } from './dto/update-rental.dto';

@Injectable()
export class RentalsService {
  constructor(private readonly prisma: PrismaService) {}

  async createRental(data: CreateRentalDto) {
    return this.prisma.rental.create({ data });
  }

  async getRentalById(id: number) {
    const rental = await this.prisma.rental.findUnique({ where: { id } });
    if (!rental) throw new NotFoundException('Rental not found');
    return rental;
  }

  async updateRental(id: number, data: UpdateRentalDto) {
    return this.prisma.rental.update({
      where: { id },
      data,
    });
  }

  async deleteRental(id: number) {
    return this.prisma.rental.delete({ where: { id } });
  }

  async getAllRentals() {
    return this.prisma.rental.findMany();
  }
}