import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(data: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = await this.prisma.user.create({
      data: {
        ...data,
        password: hashedPassword,
      },
    });

    const { password, ...rest } = user;
    return rest;
  }

  async getUserById(id: number) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) throw new NotFoundException('User not found');
    const { password, ...rest } = user;
    return rest;
  }

  async findByEmail(email: string) {
    const user = await this.prisma.user.findUnique({ where: { email }, include: { role: true } });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async updateUser(id: number, data: UpdateUserDto) {
    let updateData = { ...data };

    if (data.password) {
      const hashed = await bcrypt.hash(data.password, 10);
      updateData.password = hashed;
    }

    const user = await this.prisma.user.update({
      where: { id },
      data: updateData,
    });

    const { password, ...rest } = user;
    return rest;
  }

  async deleteUser(id: number) {
    await this.prisma.user.delete({ where: { id } });
    return null;
  }

  async getAllUsers() {
    return this.prisma.user.findMany();
  }
}
