import { RegisterUserDto } from "../dto/RegisterUserDto"
import { Users } from "../entity/users.entity"

export interface UsersRepositoryInterface {
    create(loginUserDto: RegisterUserDto): Promise<Users>
    getUserDataById(id: number): Promise<Users>
    getUserDataByEmail(email: string): Promise<Users>
    getUserByAccessToken(accessToken: string): Promise<Users>
    updateAccessTokenByUserId(id: number, accessToken: string): Promise<Users>
}