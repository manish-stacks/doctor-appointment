import { Module } from '@nestjs/common';
import { UserAddressController } from './user_address.controller';
import { UserAddressService } from './user_address.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserAddress } from './user_address.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserAddress])],
  controllers: [UserAddressController],
  providers: [UserAddressService]
})
export class UserAddressModule { }
