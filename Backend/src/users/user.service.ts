import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/User.entity';
import * as bcrypt from 'bcrypt';
import { NewsEntity } from 'src/News.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(NewsEntity)
    private newRepository: Repository<NewsEntity>,
  ) {}

  async register(name: string, email: string, password: string): Promise<UserEntity> {
    const existingUser = await this.userRepository.findOneBy({ email });
    if (existingUser) {
      throw new ConflictException('Email already in use');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = this.userRepository.create({ name, email, password: hashedPassword });
    return this.userRepository.save(user);
  }

  async login(email: string, password: string): Promise<UserEntity> {
    const user = await this.userRepository.findOneBy({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new NotFoundException('Invalid credentials');
    }
    return user;
  }

  async findById(id: number): Promise<UserEntity> {
    const user = await this.userRepository.findOneBy({ user_id: id });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async update(id: number, updateData: Partial<UserEntity>): Promise<UserEntity> {
    const user = await this.userRepository.preload({
      user_id: id,
      ...updateData,
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.userRepository.save(user);
  }


  async getAllNews(){
    return this.newRepository.find();
  }

  async getItemNew(id){
    return this.newRepository.findOneBy({id: id});
  }
}
