import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CardEntity } from './entities/card.entity';
import { Repository } from 'typeorm';
import { ColumnEntity } from '../column/entities/column.entity';

@Injectable()
export class CardService {
  constructor(
    @InjectRepository(CardEntity)
    private cardRepository: Repository<CardEntity>,
    @InjectRepository(ColumnEntity)
    private columnRepository: Repository<ColumnEntity>,
  ) {}

  async create(createCardDto: CreateCardDto) {
    const column = await this.columnRepository.findOneBy({
      id: createCardDto.columnId,
    });
    const card = await this.cardRepository.create({
      card: createCardDto.card,
      column: column,
    });
    return this.cardRepository.save(card);
  }

  async findAll() {
    return await this.cardRepository.find();
  }

  async getById(id: number) {
    const card = await this.cardRepository.findOneBy({ id: id });
    if (!card) {
      throw new NotFoundException();
    }
    return card;
  }
  async get_Comment_of_Cards() {
    return await this.cardRepository.find({
      relations: { comments: true },
    });
  }
  async filteringByColumnId(columnId: number) {
    const items = await this.cardRepository.find({
      relations: { column: true },
    });

    const arr = items.map((el) => {
      return el.column.id;
    });

    return items.filter((element, index) => {
      return arr[index] == columnId;
    });
  }
  async findOne(id: number) {
    return await this.getById(id);
  }

  async update(id: number, updateCardDto: UpdateCardDto) {
    const card = await this.getById(id);
    return this.cardRepository.update(card, updateCardDto);
  }

  async remove(id: number) {
    return await this.cardRepository.delete(id);
  }
}
