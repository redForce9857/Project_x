import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommentEntity } from './entities/comment.entity';
import { CreateCommentDto } from './dto/create-column.dto';
import { UpdateCommentDto } from './dto/update-column.dto';
import { CardEntity } from '../card/entities/card.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentEntity)
    private commentRepository: Repository<CommentEntity>,
    @InjectRepository(CardEntity)
    private cardRepository: Repository<CardEntity>,
  ) {}

  async create(createCommentDto: CreateCommentDto) {
    const card = await this.cardRepository.findOneBy({
      id: createCommentDto.cardId,
    });
    const comment = this.commentRepository.create({
      comment: createCommentDto.comment,
      card: card,
    });
    return this.commentRepository.save(comment);
  }

  async findAll() {
    return await this.commentRepository.find();
  }

  async getById(id: number) {
    const comment = await this.commentRepository.findOneBy({ id: id });
    if (!comment) {
      throw new NotFoundException();
    }
    return comment;
  }

  async filteringByCardId(cardId: number) {
    const items = await this.commentRepository.find({
      relations: { card: true },
    });

    const arr = items.map((el) => {
      return el.card.id;
    });

    return items.filter((element, index) => {
      return arr[index] == cardId;
    });
  }

  async findOne(id: number) {
    return await this.getById(id);
  }

  async update(id: number, updateCommentDto: UpdateCommentDto) {
    const comment = await this.getById(id);
    return this.commentRepository.update(comment, updateCommentDto);
  }

  async remove(id: number) {
    return await this.commentRepository.delete(id);
  }
}
