import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateColumnDto } from './dto/create-column.dto';
import { UpdateColumnDto } from './dto/update-column.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ColumnEntity } from './entities/column.entity';
import { UserEntity } from '../user/entities/user.entity';

@Injectable()
export class ColumnService {
  constructor(
    @InjectRepository(ColumnEntity)
    private columnRepository: Repository<ColumnEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async create(createColumnDto: CreateColumnDto) {
    const user = await this.userRepository.findOneBy({
      id: createColumnDto.userId,
    });
    const column = await this.columnRepository.create({
      column: createColumnDto.column,
      user: user,
    });
    return this.columnRepository.save(column);
  }

  async findAll() {
    return await this.columnRepository.find();
  }

  async getById(id: number) {
    const column = await this.columnRepository.findOneBy({ id: id });
    if (!column) {
      throw new NotFoundException();
    }
    return column;
  }

  async findOne(id: number) {
    return await this.getById(id);
  }

  async get_Columns_of_Cards() {
    const column = await this.columnRepository.find({
      relations: { cards: true },
    });

    return column;
  }

  //   return await datasource
  // .getRepository(ColumnEntity)
  // .createQueryBuilder("column")
  // .leftJoinAndSelect("column.cards", "cards")
  // .getMany();
  // }

  async update(id: number, updateColumnDto: UpdateColumnDto) {
    const column = await this.getById(id);
    return this.columnRepository.update(column, updateColumnDto);
  }

  async remove(id: number) {
    return await this.columnRepository.delete(id);
  }
}
