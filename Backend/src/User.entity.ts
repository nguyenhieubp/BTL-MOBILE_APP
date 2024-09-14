import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { AttendanceEntity } from './Attendance.entity';

@Entity('Users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  user_id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 255 })
  password: string;

  @Column({ type: 'varchar', length: 255, nullable: true })  // Cột mới để lưu đường dẫn ảnh
  image: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date = new Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date = new Date;

  @OneToMany(() => AttendanceEntity, attendance => attendance.user)
  attendances: AttendanceEntity[];
}
