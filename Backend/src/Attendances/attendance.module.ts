import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/User.entity';
import { AttendanceEntity } from 'src/Attendance.entity';
import { AttendanceService } from './attendance.service';
import { AttendanceController } from './attendance.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, AttendanceEntity])],
  providers: [AttendanceService],
  controllers: [AttendanceController],
})
export class AttendanceModule {}
