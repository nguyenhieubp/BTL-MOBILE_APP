import { UserService } from './user.service';
import { UserEntity } from 'src/User.entity';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    register(name: string, email: string, password: string): Promise<UserEntity>;
    login(email: string, password: string): Promise<UserEntity>;
    findById(id: number): Promise<UserEntity>;
    update(id: number, updateData: Partial<UserEntity>, file: Express.Multer.File): Promise<UserEntity>;
    getAllNew(): Promise<import("../News.entity").NewsEntity[]>;
    getItemNew(id: any): Promise<import("../News.entity").NewsEntity>;
}
