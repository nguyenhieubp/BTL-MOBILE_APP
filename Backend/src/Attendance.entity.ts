import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { UserEntity } from './User.entity';

@Entity('Attendances')
export class AttendanceEntity {
  @PrimaryGeneratedColumn()
  attendance_id: number;

  @Column({ type: 'date' })
  date: Date;

  @Column({ type: 'boolean', default: false })
  attended: boolean;

  @ManyToOne(() => UserEntity, user => user.attendances, { eager: true, onDelete: 'CASCADE' })
  user: UserEntity; // Không cần định nghĩa user_id ở đây
}
