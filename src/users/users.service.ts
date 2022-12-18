import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { EntityNotFoundError, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as uuid from 'uuid';
import { hashPassword } from 'src/utils/hash-password';
import { Department } from './entities/department.entity';
import { Role } from 'src/role/entities/role.entities';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Department)
    private departmentRepository: Repository<Department>,
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    console.log(createUserDto);

    const checkNis = await this.usersRepository.findOne({
      where: {
        nis: createUserDto.nis,
      }
    });

    if(checkNis) {
      throw new HttpException(
        {
          statusCode: HttpStatus.NOT_ACCEPTABLE,
          message: 'account is already exist'
        },
        HttpStatus.NOT_FOUND,
      );
    }

    const salt = uuid.v4();
    const user = new User();
    user.firstName =  createUserDto.firstName
    user.lastName = createUserDto.lastName
    user.nis = createUserDto.nis
    user.isActive = createUserDto.isActive
    user.password = await hashPassword(createUserDto.password, salt)
    user.salt = salt
    user.department = await this.departmentRepository.findOneOrFail({where: {code: createUserDto.jurusan}})
    user.role = await this.roleRepository.findOneOrFail({where: {id: createUserDto.role}})

    const result = await this.usersRepository.insert(user)

    return this.usersRepository.findOneOrFail({
      where: {
        id: result.identifiers[0].id,
      },
      relations: ['department', 'role']
    });
  }

  findAll() {
    return this.usersRepository.findAndCount({
      relations: ['department', 'role']
    });
  }

  async findOne(id: string) {
    try {
      return await this.usersRepository.findOneOrFail({
        where: {
          id,
        },
        relations : ['department', 'role']
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
  }

  // async update(id: string, updateUserDto: UpdateUserDto) {
  //   try {
  //     await this.usersRepository.findOneOrFail({
  //       where: {
  //         id,
  //       },

  //        relations : ['department', 'role']
  //     });
  //   } catch (e) {
  //     if (e instanceof EntityNotFoundError) {
  //       throw new HttpException(
  //         {
  //           statusCode: HttpStatus.NOT_FOUND,
  //           error: 'Data not found',
  //         },
  //         HttpStatus.NOT_FOUND,
  //       );
  //     } else {
  //       throw e;
  //     }
  //   }

  //   await this.usersRepository.update(id, updateUserDto);

  //   return this.usersRepository.findOneOrFail({
  //     where: {
  //       id,
  //     },
  //   });
  // }

  async remove(id: string) {
    try {
      await this.usersRepository.findOneOrFail({
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

    await this.usersRepository.delete(id);
  }
}
