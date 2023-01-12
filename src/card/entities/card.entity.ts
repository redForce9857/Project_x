import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ColumnEntity } from '../../column/entities/column.entity';
import { CommentEntity } from '../../comment/entities/comment.entity';

@Entity({ name: 'card' })
export class CardEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  card: string;

  @ManyToOne(() => ColumnEntity, (column) => column.cards)
  column: ColumnEntity;

  @OneToMany(() => CommentEntity, (comment) => comment.card)
  comments: CommentEntity[];
}
