import { Module } from '@nestjs/common';
import { ColumnService } from './column.service';
import { ColumnController } from './column.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ColumnEntity } from './entities/column.entity';
import { UserEntity } from '../user/entities/user.entity';
import { UserModule } from '../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([ColumnEntity, UserEntity]), UserModule],
  controllers: [ColumnController],
  providers: [ColumnService],
})
export class ColumnModule {}
