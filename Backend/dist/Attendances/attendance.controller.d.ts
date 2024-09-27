import { AttendanceService } from './attendance.service';
import { AttendanceDto } from './AttendanceDto';
export declare class AttendanceController {
    private readonly attendanceService;
    constructor(attendanceService: AttendanceService);
    markAttendance(userId: number): Promise<AttendanceDto>;
    getAttendance(userId: number): Promise<AttendanceDto[]>;
    getAttendanceExcel(): Promise<void>;
}
