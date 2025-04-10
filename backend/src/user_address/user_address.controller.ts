import { Controller } from '@nestjs/common';
import { UserAddressService } from './user_address.service';

@Controller('user-address')
export class UserAddressController {
    constructor(private readonly userAddressService: UserAddressService) {}
}
