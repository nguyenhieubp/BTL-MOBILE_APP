import { Repository } from 'typeorm';
import { UserEntity } from 'src/User.entity';
import { NewsEntity } from 'src/News.entity';
export declare class UserService {
    private userRepository;
    private newRepository;
    constructor(userRepository: Repository<UserEntity>, newRepository: Repository<NewsEntity>);
    register(name: string, email: string, password: string): Promise<UserEntity>;
    login(email: string, password: string): Promise<UserEntity>;
    findById(id: number): Promise<UserEntity>;
    update(id: number, updateData: Partial<UserEntity>): Promise<UserEntity>;
    getAllNews(): Promise<NewsEntity[]>;
    getItemNew(id: any): Promise<NewsEntity>;
}
