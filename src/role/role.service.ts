import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityNotFoundError, Repository } from 'typeorm';
import { CreateRoleDto } from './dto/create-role.dto';
import { Role } from './entities/role.entities';
import * as uuid from 'uuid';

@Injectable()
export class RoleService {
    constructor(
        @InjectRepository(Role)
        private roleRepository: Repository<Role>,
    ){}

    async create(createRoleDto: CreateRoleDto){

        const role = new Role()
        role.name = createRoleDto.name

        const result = await this.roleRepository.insert(role)

        return this.roleRepository.findOneOrFail({
            where: {
                id: result.identifiers[0].id,
            }
        })
    }

    async update(id: string, updateRoleDto: CreateRoleDto) {
        try {
            await this.roleRepository.findOneOrFail({
                where: {
                    id,
                }
            })
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

        await this.roleRepository.update(id, updateRoleDto);

        return this.roleRepository.findOneOrFail({
            where: {
                id,
            }
        })
    }


    async findAll() {
        return this.roleRepository.findAndCount();
    }


    async remove(id: string) {
        try {
            await this.roleRepository.findOneOrFail({
                where: {
                    id
                }
            })
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

        await this.roleRepository.delete(id);
    }
}
