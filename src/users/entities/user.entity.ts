import { IsDate } from 'class-validator';
import { Post } from 'src/posts/entities/post.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('User') //User가 테이블 명으로 생기는거임
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  // unique해야하는거 추가하기
  userId: string;

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];

  // unique해야하는거 추가하기
  @Column({ length: 60 })
  email: string;

  @Column({ length: 30 })
  password: string;

  @CreateDateColumn()
  createDate: Date;

  @IsDate()
  @Column()
  policyAgreementDate: Date;
}
