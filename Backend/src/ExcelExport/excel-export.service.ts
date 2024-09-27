import { Injectable } from '@nestjs/common';
import * as ExcelJS from 'exceljs';
import { UserEntity } from 'src/User.entity';
import * as moment from 'moment';

@Injectable()
export class ExcelExportService {
  async exportAttendancesToExcel(users: UserEntity[], startDate: Date, endDate: Date): Promise<any> {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Attendances');

    // Tạo mảng các ngày từ startDate đến endDate
    const dateRange = this.generateDateRange(startDate, endDate);

    // Định nghĩa header cho bảng
    worksheet.columns = [
      { header: 'Họ tên', key: 'name', width: 30 },
      ...dateRange.map(date => ({ header: moment(date).format('DD/MM'), key: date.toISOString(), width: 10 })),
    ];

    // Thêm dữ liệu chấm công vào bảng
    users.forEach(user => {
      const row = { name: user.name };

      // Thêm từng ngày vào các cột tương ứng
      dateRange.forEach((date, index) => {
        const attendance = user.attendances.find(att => moment(att.date).isSame(date, 'day'));
        const value = attendance?.attended ? 'x' : '0';

        // Thêm dữ liệu vào row
        row[date.toISOString()] = value;
      });

      // Thêm dòng vào worksheet
      const insertedRow = worksheet.addRow(row);

      // Định dạng màu đỏ cho các ô có giá trị là '0'
      dateRange.forEach((date, index) => {
        const cell = insertedRow.getCell(index + 2); // Bắt đầu từ cột thứ 2 (vì cột đầu tiên là tên)
        if (cell.value === '0') {
          cell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FFFF0000' }, // Màu đỏ (ARGB format)
          };
        }
      });
    });

    // Xuất file dưới dạng buffer
    const buffer = await workbook.xlsx.writeBuffer();
    return buffer;
  }

  // Hàm để tạo mảng các ngày từ startDate đến endDate
  private generateDateRange(startDate: Date, endDate: Date): Date[] {
    const dates: Date[] = [];
    let currentDate = moment(startDate);

    while (currentDate.isSameOrBefore(endDate, 'day')) {
      dates.push(currentDate.toDate());
      currentDate = currentDate.add(1, 'day');
    }

    return dates;
  }
}
