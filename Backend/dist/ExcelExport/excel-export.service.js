"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExcelExportService = void 0;
const common_1 = require("@nestjs/common");
const ExcelJS = require("exceljs");
const moment = require("moment");
let ExcelExportService = class ExcelExportService {
    async exportAttendancesToExcel(users, startDate, endDate) {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Attendances');
        const dateRange = this.generateDateRange(startDate, endDate);
        worksheet.columns = [
            { header: 'Họ tên', key: 'name', width: 30 },
            ...dateRange.map(date => ({ header: moment(date).format('DD/MM'), key: date.toISOString(), width: 10 })),
        ];
        users.forEach(user => {
            const row = { name: user.name };
            dateRange.forEach((date, index) => {
                const attendance = user.attendances.find(att => moment(att.date).isSame(date, 'day'));
                const value = attendance?.attended ? 'x' : '0';
                row[date.toISOString()] = value;
            });
            const insertedRow = worksheet.addRow(row);
            dateRange.forEach((date, index) => {
                const cell = insertedRow.getCell(index + 2);
                if (cell.value === '0') {
                    cell.fill = {
                        type: 'pattern',
                        pattern: 'solid',
                        fgColor: { argb: 'FFFF0000' },
                    };
                }
            });
        });
        const buffer = await workbook.xlsx.writeBuffer();
        return buffer;
    }
    generateDateRange(startDate, endDate) {
        const dates = [];
        let currentDate = moment(startDate);
        while (currentDate.isSameOrBefore(endDate, 'day')) {
            dates.push(currentDate.toDate());
            currentDate = currentDate.add(1, 'day');
        }
        return dates;
    }
};
exports.ExcelExportService = ExcelExportService;
exports.ExcelExportService = ExcelExportService = __decorate([
    (0, common_1.Injectable)()
], ExcelExportService);
//# sourceMappingURL=excel-export.service.js.map