import { Test, TestingModule } from '@nestjs/testing';
import { RentalsService } from '../src/rentals/rentals.service';
import { PrismaService } from '../src/prisma/prisma.service';

const rentalArray = [
  { id: 1, userId: 1, courtId: 1, startTime: '2024-06-10T10:00:00Z', endTime: '2024-06-10T11:00:00Z' },
  { id: 2, userId: 2, courtId: 2, startTime: '2024-06-11T12:00:00Z', endTime: '2024-06-11T13:00:00Z' },
];

const db = {
  rental: {
    create: jest.fn().mockResolvedValue(rentalArray[0]),
    findUnique: jest.fn().mockResolvedValue(rentalArray[0]),
    update: jest.fn().mockResolvedValue({ ...rentalArray[0], endTime: '2024-06-10T12:00:00Z' }),
    delete: jest.fn().mockResolvedValue(rentalArray[0]),
    findMany: jest.fn().mockResolvedValue(rentalArray),
  },
};

describe('RentalsService', () => {
  let service: RentalsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RentalsService,
        { provide: PrismaService, useValue: db },
      ],
    }).compile();

    service = module.get<RentalsService>(RentalsService);
  });

  it('should create a rental', async () => {
    expect(await service.createRental({ userId: 1, courtId: 1, startTime: '2024-06-10T10:00:00Z', endTime: '2024-06-10T11:00:00Z' })).toEqual(rentalArray[0]);
  });

  it('should get all rentals', async () => {
    expect(await service.getAllRentals()).toEqual(rentalArray);
  });

  it('should get rental by id', async () => {
    expect(await service.getRentalById(1)).toEqual(rentalArray[0]);
  });

  it('should update a rental', async () => {
    expect(await service.updateRental(1, { endTime: '2024-06-10T12:00:00Z' })).toEqual({ ...rentalArray[0], endTime: '2024-06-10T12:00:00Z' });
  });

  it('should delete a rental', async () => {
    expect(await service.deleteRental(1)).toEqual(rentalArray[0]);
  });
});