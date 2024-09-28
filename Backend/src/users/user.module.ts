import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/User.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MulterModule } from '@nestjs/platform-express';
import { NewsEntity } from 'src/News.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity,NewsEntity]),
    MulterModule.register({
      dest: './uploads', // Thư mục lưu trữ file upload
    }),
  ],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
