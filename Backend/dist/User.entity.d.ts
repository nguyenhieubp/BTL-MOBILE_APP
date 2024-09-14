import { AttendanceEntity } from './Attendance.entity';
export declare class UserEntity {
    user_id: number;
    name: string;
    email: string;
    password: string;
    image: string;
    created_at: Date;
    updated_at: Date;
    attendances: AttendanceEntity[];
}
