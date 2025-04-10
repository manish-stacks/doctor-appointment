import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserAddress } from './user_address.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserAddressService {
    constructor(@InjectRepository(UserAddress)
    private userAddressRepository: Repository<UserAddress>) { }


    
}
