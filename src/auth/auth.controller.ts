import { Body, Controller, Param, Post } from '@nestjs/common';
import { RegisterUserDto } from 'src/users/dto/RegisterUserDto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/LoginDto';
import { ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('/register')
    async register(@Body() registerUserDto: RegisterUserDto) {
        const loginUser = await this.authService.register(registerUserDto);
        return {
            ...loginUser,
        }; 
    }

    @Post('/login')
    async login(@Body() loginDto: LoginDto) {
        const loginUser = await this.authService.login(loginDto);
        return {
            ...loginUser,
        };
    }

    @Post('/logout')
    async logout(@Param('access_token') accessToken: string) {
        return await this.authService.logout(accessToken);
    }
}
