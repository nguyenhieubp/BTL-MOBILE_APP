import { Repository } from 'typeorm';
import { UserEntity } from 'src/User.entity';
import { AttendanceEntity } from 'src/Attendance.entity';
import { AttendanceDto } from './AttendanceDto';
export declare class AttendanceService {
    private userRepository;
    private attendanceRepository;
    constructor(userRepository: Repository<UserEntity>, attendanceRepository: Repository<AttendanceEntity>);
    markAttendance(userId: number): Promise<AttendanceDto>;
    getAttendance(userId: number): Promise<AttendanceDto[]>;
    private mapToDto;
}
