import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentEntity } from './entities/comment.entity';
import { CardEntity } from '../card/entities/card.entity';
import { CardModule } from '../card/card.module';

@Module({
  imports: [TypeOrmModule.forFeature([CommentEntity, CardEntity]), CardModule],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
