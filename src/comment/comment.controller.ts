import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { UpdateCommentDto } from './dto/update-column.dto';
import { CreateCommentDto } from './dto/create-column.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from '../auth/decorators/role.decorator';
import { JwtAuthGuard } from '../auth/guard/auth_jwt_guards';
import { RoleGuard } from '../auth/guard/auth_role_guards';

@ApiTags('Comment')
@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  @ApiBearerAuth()
  @Roles('admin')
  @UseGuards(JwtAuthGuard, RoleGuard)
  create(@Body() createCommentDto: CreateCommentDto) {
    return this.commentService.create(createCommentDto);
  }

  @Get()
  findAll() {
    return this.commentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.commentService.findOne(id);
  }

  @Get('filtering/:cardId')
  filtering(@Param('cardId') cardId: number) {
    return this.commentService.filteringByCardId(cardId);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @Roles('admin')
  @UseGuards(JwtAuthGuard, RoleGuard)
  update(@Param('id') id: number, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentService.update(id, updateCommentDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @Roles('admin')
  @UseGuards(JwtAuthGuard, RoleGuard)
  remove(@Param('id') id: number) {
    return this.commentService.remove(id);
  }
}
