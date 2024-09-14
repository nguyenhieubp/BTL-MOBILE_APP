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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttendanceEntity = void 0;
const typeorm_1 = require("typeorm");
const User_entity_1 = require("./User.entity");
let AttendanceEntity = class AttendanceEntity {
};
exports.AttendanceEntity = AttendanceEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], AttendanceEntity.prototype, "attendance_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", Date)
], AttendanceEntity.prototype, "date", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], AttendanceEntity.prototype, "attended", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_entity_1.UserEntity, user => user.attendances, { eager: true, onDelete: 'CASCADE' }),
    __metadata("design:type", User_entity_1.UserEntity)
], AttendanceEntity.prototype, "user", void 0);
exports.AttendanceEntity = AttendanceEntity = __decorate([
    (0, typeorm_1.Entity)('Attendances')
], AttendanceEntity);
//# sourceMappingURL=Attendance.entity.js.map