import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ColumnEntity } from '../../column/entities/column.entity';
import { Role } from '../../auth/types/user_roles';

@Entity({ name: 'user' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.USER,
  })
  role?: Role;

  @OneToMany(() => ColumnEntity, (column) => column.user)
  columns: ColumnEntity[];
}
