import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserEntity } from './User.entity';
import { AttendanceEntity } from './Attendance.entity';
import { UserModule } from './users/user.module';
import { AttendanceModule } from './Attendances/attendance.module';
import { ExcelModule } from './ExcelExport/excel-export.modules';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '12345678',
      database: 'mobileappbtl',
      entities: [UserEntity,AttendanceEntity],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([UserEntity, AttendanceEntity]),
    UserModule,
    AttendanceModule,
    ExcelModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}