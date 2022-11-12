import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './entity/users.entity';
import { UsersRepository } from './repository/UsersRepository';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([Users])],
  controllers: [UsersController],
  providers: [
    UsersService,
    { provide: 'UsersRepository', useClass: UsersRepository }
  ],
  exports: [UsersService],
})
export class UsersModule {}
