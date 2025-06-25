import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../src/users/users.service';
import { PrismaService } from '../src/prisma/prisma.service';

const userArray = [
  { id: 1, name: 'Alice', email: 'alice@mail.com', password: '123456' },
  { id: 2, name: 'Bob', email: 'bob@mail.com', password: 'abcdef' },
];

const db = {
  user: {
    create: jest.fn().mockResolvedValue(userArray[0]),
    findUnique: jest.fn().mockResolvedValue(userArray[0]),
    update: jest.fn().mockResolvedValue({ ...userArray[0], name: 'Updated' }),
    delete: jest.fn().mockResolvedValue(userArray[0]),
    findMany: jest.fn().mockResolvedValue(userArray),
  },
};

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: PrismaService, useValue: db },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should create a user', async () => {
    expect(await service.createUser({ name: 'Alice', email: 'alice@mail.com', password: '123456' })).toEqual(userArray[0]);
  });

  it('should get all users', async () => {
    expect(await service.getAllUsers()).toEqual(userArray);
  });

  it('should get user by id', async () => {
    expect(await service.getUserById(1)).toEqual(userArray[0]);
  });

  it('should update a user', async () => {
    expect(await service.updateUser(1, { name: 'Updated' })).toEqual({ ...userArray[0], name: 'Updated' });
  });

  it('should delete a user', async () => {
    expect(await service.deleteUser(1)).toEqual(userArray[0]);
  });
});