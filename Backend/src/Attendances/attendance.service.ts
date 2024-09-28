import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/User.entity';
import { AttendanceEntity } from 'src/Attendance.entity';
import { AttendanceDto } from './AttendanceDto';

@Injectable()
export class AttendanceService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(AttendanceEntity)
    private attendanceRepository: Repository<AttendanceEntity>,
  ) {}

  async markAttendance(userId: number): Promise<AttendanceDto> {
    // Kiểm tra xem người dùng có tồn tại không
    const user = await this.userRepository.findOneBy({ user_id: userId });
    if (!user) {
      throw new NotFoundException('User not found');
    }
  
    // Lấy ngày hiện tại và đặt giờ về 00:00:00
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Kiểm tra xem đã có bản ghi điểm danh cho ngày hôm nay chưa
    let existingAttendance = await this.attendanceRepository.findOne({
      where: { user: user, date: today },
    });
  
    if (existingAttendance) {
      // Nếu đã có bản ghi, cập nhật bản ghi hiện tại
      existingAttendance.attended = true;
      existingAttendance = await this.attendanceRepository.save(existingAttendance);
    } else {
      // Nếu chưa có bản ghi, tạo mới bản ghi điểm danh
      existingAttendance = new AttendanceEntity();
      existingAttendance.user = user;
      existingAttendance.date = today;
      existingAttendance.attended = true;
  
      existingAttendance = await this.attendanceRepository.save(existingAttendance);
    }
  
    return this.mapToDto(existingAttendance);
  }
  

  async getAttendance(userId: number): Promise<AttendanceDto[]> {
    const user = await this.userRepository.findOneBy({ user_id: userId });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // const today = new Date();
    // today.setHours(0, 0, 0, 0);

    const attendances = await this.attendanceRepository.find({
      where: { user: user},
    });

    if (attendances.length === 0) {
      const attendance = new AttendanceEntity();
      attendance.user = user;
      attendance.attended = false;
      attendance.date = new Date();

      await this.attendanceRepository.save(attendance);
      return [this.mapToDto(attendance)];
    }

    return attendances.map(this.mapToDto);
  }

  private mapToDto(attendance: AttendanceEntity): AttendanceDto {
    const { attendance_id, date, attended } = attendance;
    return { attendance_id, date, attended };
  }
}
