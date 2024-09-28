"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const User_entity_1 = require("./User.entity");
const Attendance_entity_1 = require("./Attendance.entity");
const user_module_1 = require("./users/user.module");
const attendance_module_1 = require("./Attendances/attendance.module");
const excel_export_modules_1 = require("./ExcelExport/excel-export.modules");
const News_entity_1 = require("./News.entity");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot({
                type: 'mysql',
                host: 'localhost',
                port: 3306,
                username: 'root',
                password: '12345678',
                database: 'mobileappbtl',
                entities: [User_entity_1.UserEntity, Attendance_entity_1.AttendanceEntity, News_entity_1.NewsEntity],
                synchronize: true,
            }),
            typeorm_1.TypeOrmModule.forFeature([User_entity_1.UserEntity, Attendance_entity_1.AttendanceEntity, News_entity_1.NewsEntity]),
            user_module_1.UserModule,
            attendance_module_1.AttendanceModule,
            excel_export_modules_1.ExcelModule
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService]
    })
], AppModule);
//# sourceMappingURL=app.module.js.map