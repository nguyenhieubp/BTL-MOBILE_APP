import { Controller, Post, Body, Get, Param, Put, ParseIntPipe, UseInterceptors, UploadedFile } from '@nestjs/common';
import { UserService } from './user.service';
import { UserEntity } from 'src/User.entity';
import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';
import { extname } from 'path';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(
    @Body('name') name: string,
    @Body('email') email: string,
    @Body('password') password: string,
  ): Promise<UserEntity> {
    return this.userService.register(name, email, password);
  }

  @Post('login')
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
  ): Promise<UserEntity> {
    return this.userService.login(email, password);
  }

  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number): Promise<UserEntity> {
    return this.userService.findById(id);
  }

  @Put(':id')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          cb(null, `${uniqueSuffix}${ext}`);
        },
      }),
    }),
  )
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateData: Partial<UserEntity>,
    @UploadedFile() file: Express.Multer.File, // Thêm file upload
  ): Promise<UserEntity> {
    if (file) {
      // Nếu có file ảnh, thêm đường dẫn vào updateData
      updateData.image = file.path;
    }

    return this.userService.update(id, updateData);
  }

  @Get('all/news')
  async getAllNew(){
    return this.userService.getAllNews();
  }

  @Get('item/news/:id')
  async getItemNew(@Param('id') id ){
    return this.userService.getItemNew(id);
  }
}
