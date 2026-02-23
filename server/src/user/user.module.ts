/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UtilsModule } from 'utils/utils.module';
import { AuthModule } from 'src/auth/auth.module';


@Module({
  imports: [
    TypeOrmModule.forFeature([User]), 
    UtilsModule, 
    AuthModule
  ],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
