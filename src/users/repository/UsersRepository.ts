import { RegisterUserDto } from "../dto/RegisterUserDto";
import { Users } from "../entity/users.entity";
import { UsersRepositoryInterface } from "../interface/UsersRepositoryInterface";
import * as bcrypt from 'bcrypt';
import { Injectable } from "@nestjs/common";
const saltOrRounds = 10;

@Injectable()
export class UsersRepository implements UsersRepositoryInterface {
    async create(loginUserDto: RegisterUserDto): Promise<Users> {
        const user = Users.create();
        user.firstName = loginUserDto.firstName;
        user.lastName = loginUserDto.lastName;
        user.email = loginUserDto.email;
        user.password = await bcrypt.hash(loginUserDto.password, saltOrRounds);
        await Users.save(user);
        return user;
    }

    async getUserDataById(id: number): Promise<Users> {
        const user = await Users.findOne({ where: { id: id } });
        return user;
    }

    async getUserDataByEmail(email: string): Promise<Users> {
        const user = await Users.findOne({ where: { email: email } });
        return user;
    }

    async getUserByAccessToken(accessToken: string) {
        console.log(accessToken);
        const user = await Users.findOne({ where: { accessToken: accessToken } });
        return user;
    }

    async updateAccessTokenByUserId(id: number, accessToken: string): Promise<Users> {
        const user = await this.getUserDataById(id);
        user.accessToken = accessToken;
        await Users.save(user);
        return user;
    }
}