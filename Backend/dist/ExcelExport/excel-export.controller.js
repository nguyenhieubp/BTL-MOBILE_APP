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
exports.ExcelExportController = void 0;
const common_1 = require("@nestjs/common");
const excel_export_service_1 = require("./excel-export.service");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const User_entity_1 = require("../User.entity");
const moment = require("moment");
let ExcelExportController = class ExcelExportController {
    constructor(excelExportService, userRepository) {
        this.excelExportService = excelExportService;
        this.userRepository = userRepository;
    }
    async exportAttendances(res) {
        const users = await this.userRepository.find({ relations: ['attendances'] });
        const today = moment().toDate();
        const tenDaysAgo = moment().subtract(30, 'days').toDate();
        const buffer = await this.excelExportService.exportAttendancesToExcel(users, tenDaysAgo, today);
        res.setHeader('Content-Disposition', 'attachment; filename=attendances.xlsx');
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.send(buffer);
    }
};
exports.ExcelExportController = ExcelExportController;
__decorate([
    (0, common_1.Get)('attendances'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ExcelExportController.prototype, "exportAttendances", null);
exports.ExcelExportController = ExcelExportController = __decorate([
    (0, common_1.Controller)('export'),
    __param(1, (0, typeorm_1.InjectRepository)(User_entity_1.UserEntity)),
    __metadata("design:paramtypes", [excel_export_service_1.ExcelExportService,
        typeorm_2.Repository])
], ExcelExportController);
//# sourceMappingURL=excel-export.controller.js.map