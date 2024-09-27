import { UserEntity } from 'src/User.entity';
export declare class ExcelExportService {
    exportAttendancesToExcel(users: UserEntity[], startDate: Date, endDate: Date): Promise<any>;
    private generateDateRange;
}
