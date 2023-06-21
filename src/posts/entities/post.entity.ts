import { UserEntity } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('Post')
export class Post {
  @PrimaryGeneratedColumn()
  postId: string;

  @ManyToOne(() => UserEntity, (user) => user.posts)
  user: UserEntity;

  @Column()
  postTitle: string;

  @Column()
  content: string;

  @CreateDateColumn()
  createDate: Date;
}
