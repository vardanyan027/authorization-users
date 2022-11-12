import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { RegisterUserDto } from './dto/RegisterUserDto';
import { UsersRepositoryInterface } from './interface/UsersRepositoryInterface';

@Injectable()
export class UsersService {
    constructor(
        @Inject('UsersRepository')
        private readonly userRepository: UsersRepositoryInterface,
        @Inject(CACHE_MANAGER) private cacheService: Cache,
    ){}

    async create(createUserDto: RegisterUserDto) {
        const user = await this.userRepository.create(createUserDto);
        return user;
    }

    async getUserData(accessToken: string) {
        const user = await this.userRepository.getUserByAccessToken(accessToken);
        return user;
    }

    async updateAccessTokenByUserId(userId: number, accessToken: string) 
    {
        await this.userRepository.updateAccessTokenByUserId(userId, accessToken);
    }

    async getUserByAccessToken(accessToken: string) {
        const user = await this.userRepository.getUserByAccessToken(accessToken);
        return user;
    }

    async getUserDataByEmail(email: string) {
        const user = await this.userRepository.getUserDataByEmail(email);
        return user;
    }
}
