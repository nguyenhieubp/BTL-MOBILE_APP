import { Response } from 'express';
import { ExcelExportService } from './excel-export.service';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/User.entity';
export declare class ExcelExportController {
    private readonly excelExportService;
    private userRepository;
    constructor(excelExportService: ExcelExportService, userRepository: Repository<UserEntity>);
    exportAttendances(res: Response): Promise<void>;
}
