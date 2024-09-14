import { UserEntity } from './User.entity';
export declare class AttendanceEntity {
    attendance_id: number;
    date: Date;
    attended: boolean;
    user: UserEntity;
}
