import { Module } from '@nestjs/common';
import { CardService } from './card.service';
import { CardController } from './card.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CardEntity } from './entities/card.entity';
import { ColumnEntity } from '../column/entities/column.entity';
import { ColumnModule } from '../column/column.module';

@Module({
  imports: [TypeOrmModule.forFeature([CardEntity, ColumnEntity]), ColumnModule],
  controllers: [CardController],
  providers: [CardService],
})
export class CardModule {}
