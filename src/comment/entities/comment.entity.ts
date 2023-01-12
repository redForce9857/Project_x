import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CardEntity } from '../../card/entities/card.entity';

@Entity({ name: 'comment' })
export class CommentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  comment: string;

  @ManyToOne(() => CardEntity, (card) => card.comments)
  card: CardEntity;
}
