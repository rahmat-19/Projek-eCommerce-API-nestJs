import { Test, TestingModule } from '@nestjs/testing';
import { InventorysService } from './inventorys.service';

describe('InventorysService', () => {
  let service: InventorysService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InventorysService],
    }).compile();

    service = module.get<InventorysService>(InventorysService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
