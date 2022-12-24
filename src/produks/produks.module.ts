import { Module } from '@nestjs/common';
import { ProduksService } from './produks.service';
import { ProduksController } from './produks.controller';

@Module({
  providers: [ProduksService],
  controllers: [ProduksController]
})
export class ProduksModule {}
