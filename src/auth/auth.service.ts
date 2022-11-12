import { Injectable, CACHE_MANAGER, Inject } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { v4 as uuidv4 } from 'uuid';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/LoginDto';
import { RegisterUserDto } from 'src/users/dto/RegisterUserDto';
import { UsersRepositoryInterface } from 'src/users/interface/UsersRepositoryInterface';
import * as bcrypt from 'bcrypt';
const saltOrRounds = 10;

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        @Inject(CACHE_MANAGER) private cacheService: Cache,
    ) {}

    async register(registerUserDto: RegisterUserDto) {
        const user = await this.usersService.create(registerUserDto);
        const key = `user-${user.id}`;
        const accessToken = uuidv4();
        await this.cacheService.set(key, accessToken, 60000);
        console.log(await this.cacheService.get(key));
        await this.usersService.updateAccessTokenByUserId(user.id, accessToken);
        return {
            ...user,
            accessToken,
        };
    }

    async login(loginDto: LoginDto) {
        const user = await this.usersService.getUserDataByEmail(loginDto.email);
        const isMatch = await bcrypt.compare(loginDto.password, user.password);
        if (!isMatch) {
            throw new Error('Username or Password is not correct');
        }
        const key = `user-${user.id}`;
        const accessToken = uuidv4();
        await this.cacheService.set(key, accessToken);
        await this.usersService.updateAccessTokenByUserId(user.id, accessToken);
        return {
            ...user,
            accessToken,
        };
    }

    async logout(accessToken: string) {
        const user = await this.usersService.getUserByAccessToken(accessToken);
        const key = `user-${user.id}`;
        await this.cacheService.del(key);
        await this.usersService.updateAccessTokenByUserId(user.id, null);
        return 'Log out user';
    }
}
