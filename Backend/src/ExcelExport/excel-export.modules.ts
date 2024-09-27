import { Module } from '@nestjs/common';
import { ExcelExportService } from './excel-export.service';
import { ExcelExportController } from './excel-export.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/User.entity'; // Đường dẫn tới UserEntity

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [ExcelExportService],
  controllers: [ExcelExportController],
})
export class ExcelModule {}
