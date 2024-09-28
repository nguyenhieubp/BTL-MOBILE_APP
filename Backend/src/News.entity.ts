import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('news')
export class NewsEntity {
  
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  desc: string;

  @Column({ type: 'text' })
  title: string;

  @Column({ type: 'text' })
  image: string;
}
