import { Injectable } from '@nestjs/common';
import { UnauthorizedException } from '@nestjs/common/exceptions';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private userService: UsersService,
        @InjectRepository(User) private readonly repositoryUser: Repository<User>
    ){}




    async validateUser(email: string, password: string){
      try{
        const user = await this.repositoryUser.findOneOrFail({where: {email: email}, relations: ['role']})

        if (user && bcrypt.compareSync(password, user.password)) {
          const { password, ...result } = user;
          return result
        }
        return null;

      } catch (e) {

        console.log(e);

      }

    }


    async createGenerateToken(user: User) {
        const payload = {
            id: user.id,
            email: user.email
        };
        const access_token = await this.jwtService.signAsync(payload);
        return access_token;
    }

    async login(user: any) {
      const payload = {
        id: user.id,
        email: user.email
      };
      return {
        access_token: this.jwtService.sign(payload),
      };
    }
}
