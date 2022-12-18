import { Test, TestingModule } from '@nestjs/testing';
import { InventorysController } from './inventorys.controller';

describe('InventorysController', () => {
  let controller: InventorysController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InventorysController],
    }).compile();

    controller = module.get<InventorysController>(InventorysController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
