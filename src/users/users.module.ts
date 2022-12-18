import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';
import { Department } from './entities/department.entity';
import { RoleModule } from 'src/role/role.module';
import { Role } from 'src/role/entities/role.entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Department, Role]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}

