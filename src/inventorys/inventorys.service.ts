import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Department } from 'src/users/entities/department.entity';
import { EntityNotFoundError, Repository } from 'typeorm';
import { CretaeInventoryDto } from './dto/create-inventorys.dto';
import { Inventory } from './entities/inventorys.entitiy';

@Injectable()
export class InventorysService {
    constructor(
        @InjectRepository(Inventory)
        private inventorysRepository: Repository<Inventory>,
        @InjectRepository(Department)
        private departmentRepository: Repository<Department>,
    ){}

    async create(createInvetoryDto: CretaeInventoryDto) {
        const inventory = new Inventory();
        inventory.name = createInvetoryDto.name;
        inventory.description = createInvetoryDto.description;
        inventory.stok = createInvetoryDto.stok;
        inventory.visibility = createInvetoryDto.visibility;
        if (inventory.department) {
            inventory.department = await this.departmentRepository.findOne({where: {code: createInvetoryDto.jurusan}});
        }
        const result = await this.inventorysRepository.insert(inventory)

        return this.inventorysRepository.findOneOrFail({
        where: {
            id: result.identifiers[0].id,
        },
        relations: ['department']
        });
    }

    async remove(id: string) {
        try {
            await this.inventorysRepository.findOneOrFail({
                where: {
                id,
                },
            });
        } catch (e) {
            if (e instanceof EntityNotFoundError) {
                throw new HttpException(
                {
                    statusCode: HttpStatus.NOT_FOUND,
                    error: 'Data not found',
                },
                HttpStatus.NOT_FOUND,
            );
        } else {
            throw e;
            }
        }

        await this.inventorysRepository.delete(id);
    }
}
