"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const User_entity_1 = require("../User.entity");
const bcrypt = require("bcrypt");
const News_entity_1 = require("../News.entity");
let UserService = class UserService {
    constructor(userRepository, newRepository) {
        this.userRepository = userRepository;
        this.newRepository = newRepository;
    }
    async register(name, email, password) {
        const existingUser = await this.userRepository.findOneBy({ email });
        if (existingUser) {
            throw new common_1.ConflictException('Email already in use');
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = this.userRepository.create({ name, email, password: hashedPassword });
        return this.userRepository.save(user);
    }
    async login(email, password) {
        const user = await this.userRepository.findOneBy({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new common_1.NotFoundException('Invalid credentials');
        }
        return user;
    }
    async findById(id) {
        const user = await this.userRepository.findOneBy({ user_id: id });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        return user;
    }
    async update(id, updateData) {
        const user = await this.userRepository.preload({
            user_id: id,
            ...updateData,
        });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        return this.userRepository.save(user);
    }
    async getAllNews() {
        return this.newRepository.find();
    }
    async getItemNew(id) {
        return this.newRepository.findOneBy({ id: id });
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(User_entity_1.UserEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(News_entity_1.NewsEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], UserService);
//# sourceMappingURL=user.service.js.map