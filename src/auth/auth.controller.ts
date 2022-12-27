import { Controller, Post, Body, HttpStatus, ConflictException, Get, Request, UseGuards } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UsersService,
    ){}

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req) {
        return this.authService.createGenerateToken(req.user)
    }

    @Post('register')
    async create(@Body() createUserDto: CreateUserDto){
        try{
            return {
                data: await this.userService.create(createUserDto),
                statusCode: HttpStatus.CREATED,
                message: 'success',
            };
        } catch(e){
            console.log(e);

            if (e.code === '23505'){
                throw new ConflictException('Email is already exists');

            }
        }
    }
}
