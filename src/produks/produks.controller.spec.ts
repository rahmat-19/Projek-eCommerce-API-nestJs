import { Test, TestingModule } from '@nestjs/testing';
import { ProduksController } from './produks.controller';

describe('ProduksController', () => {
  let controller: ProduksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProduksController],
    }).compile();

    controller = module.get<ProduksController>(ProduksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
