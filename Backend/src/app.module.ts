import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserEntity } from './User.entity';
import { AttendanceEntity } from './Attendance.entity';
import { UserModule } from './users/user.module';
import { AttendanceModule } from './Attendances/attendance.module';
import { ExcelModule } from './ExcelExport/excel-export.modules';
import { NewsEntity } from './News.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '12345678',
      database: 'mobileappbtl',
      entities: [UserEntity,AttendanceEntity,NewsEntity],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([UserEntity, AttendanceEntity,NewsEntity]),
    UserModule,
    AttendanceModule,
    ExcelModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}