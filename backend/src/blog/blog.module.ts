import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { BlogService } from './blog.service';
import { BlogController } from './blog.controller';
import { Blog } from './blog.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([Blog]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: configService.get<string>('JWT_EXPIRES') },
      }),
      // JwtModule.register({
      //   secret: 'secretKey',
      //   signOptions: { expiresIn: '1h' },
      // }),
    }),
  ],
  controllers: [BlogController],
  providers: [BlogService],
})
export class BlogModule { }
