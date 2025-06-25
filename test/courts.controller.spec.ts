import { Test, TestingModule } from '@nestjs/testing';
import { CourtsController } from '../src/courts/courts.controller';
import { CourtsService } from '../src/courts/courts.service';

const courtArray = [
  { id: 1, name: 'Quadra 1', location: 'Local 1' },
  { id: 2, name: 'Quadra 2', location: 'Local 2' },
];

describe('CourtsController', () => {
  let controller: CourtsController;
  let service: CourtsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CourtsController],
      providers: [
        {
          provide: CourtsService,
          useValue: {
            createCourt: jest.fn().mockResolvedValue(courtArray[0]),
            getAllCourts: jest.fn().mockResolvedValue(courtArray),
            getCourtById: jest.fn().mockResolvedValue(courtArray[0]),
            updateCourt: jest.fn().mockResolvedValue({ ...courtArray[0], name: 'Atualizada' }),
            deleteCourt: jest.fn().mockResolvedValue(courtArray[0]),
          },
        },
      ],
    }).compile();

    controller = module.get<CourtsController>(CourtsController);
    service = module.get<CourtsService>(CourtsService);
  });

  it('should create a court', async () => {
    expect(await controller.create({ name: 'Quadra 1', location: 'Local 1' })).toEqual(courtArray[0]);
  });

  it('should get all courts', async () => {
    expect(await controller.findAll()).toEqual(courtArray);
  });

  it('should get court by id', async () => {
    expect(await controller.findOne(1)).toEqual(courtArray[0]);
  });

  it('should update a court', async () => {
    expect(await controller.update(1, { name: 'Atualizada' })).toEqual({ ...courtArray[0], name: 'Atualizada' });
  });

  it('should delete a court', async () => {
    expect(await controller.remove(1)).toEqual(courtArray[0]);
  });
});