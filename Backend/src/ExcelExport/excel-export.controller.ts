import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { ExcelExportService } from './excel-export.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/User.entity';
import * as moment from 'moment'; // Sử dụng moment để tính toán ngày

@Controller('export')
export class ExcelExportController {
  constructor(
    private readonly excelExportService: ExcelExportService,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  @Get('attendances')
  async exportAttendances(@Res() res: Response) {
    const users = await this.userRepository.find({ relations: ['attendances'] });

    const today = moment().toDate();
    const tenDaysAgo = moment().subtract(30, 'days').toDate();

    const buffer = await this.excelExportService.exportAttendancesToExcel(users, tenDaysAgo, today);

    // Thiết lập header để tải file Excel
    res.setHeader('Content-Disposition', 'attachment; filename=attendances.xlsx');
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');

    // Gửi file tới client
    res.send(buffer);
  }
}
