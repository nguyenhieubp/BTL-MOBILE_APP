import { Repository } from 'typeorm';
import { UserEntity } from 'src/User.entity';
export declare class UserService {
    private userRepository;
    constructor(userRepository: Repository<UserEntity>);
    register(name: string, email: string, password: string): Promise<UserEntity>;
    login(email: string, password: string): Promise<UserEntity>;
    findById(id: number): Promise<UserEntity>;
    update(id: number, updateData: Partial<UserEntity>): Promise<UserEntity>;
}
