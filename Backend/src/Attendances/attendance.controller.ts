import { Controller, Post, Get, Param } from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { AttendanceDto } from './AttendanceDto';

@Controller('attendances')
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @Post(':userId')
  async markAttendance(@Param('userId') userId: number): Promise<AttendanceDto> {
    return this.attendanceService.markAttendance(userId);
  }

  @Get(':userId')
  async getAttendance(@Param('userId') userId: number): Promise<AttendanceDto[]> {
    return this.attendanceService.getAttendance(userId);
  }


  @Get('excel')
  async getAttendanceExcel(){
    
  }
}
