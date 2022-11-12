import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) { }

    @Get()
    async getUserData(@Param('access_token') accessToken: string) {
        const user = await this.usersService.getUserData(accessToken);
        return user;
    }
}
