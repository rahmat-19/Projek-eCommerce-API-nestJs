import { Test, TestingModule } from '@nestjs/testing';
import { ProduksService } from './produks.service';

describe('ProduksService', () => {
  let service: ProduksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProduksService],
    }).compile();

    service = module.get<ProduksService>(ProduksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
