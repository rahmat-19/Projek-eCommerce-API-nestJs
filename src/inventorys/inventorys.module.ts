import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Department } from 'src/users/entities/department.entity';
import { Inventory } from './entities/inventorys.entitiy';
import { InventorysController } from './inventorys.controller';
import { InventorysService } from './inventorys.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Inventory, Department])
  ],
  controllers: [InventorysController],
  providers: [InventorysService]
})
export class InventorysModule {}
