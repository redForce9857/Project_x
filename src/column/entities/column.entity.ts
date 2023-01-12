import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from '../../user/entities/user.entity';
import { CardEntity } from '../../card/entities/card.entity';

@Entity({ name: 'column' })
export class ColumnEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  column: string;

  @ManyToOne(() => UserEntity, (user) => user.columns)
  user: UserEntity;

  @OneToMany(() => CardEntity, (card) => card.column)
  cards: CardEntity[];
}
