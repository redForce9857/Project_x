import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CardService } from './card.service';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { JwtAuthGuard } from '../auth/guard/auth_jwt_guards';
import { RoleGuard } from '../auth/guard/auth_role_guards';
import { Roles } from '../auth/decorators/role.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Card')
@Controller('card')
export class CardController {
  constructor(private readonly cardService: CardService) {}

  @Post()
  @ApiBearerAuth()
  @Roles('admin')
  @UseGuards(JwtAuthGuard, RoleGuard)
  create(@Body() createCardDto: CreateCardDto) {
    return this.cardService.create(createCardDto);
  }

  @Get('comment_cards')
  findCommentCard() {
    return this.cardService.get_Comment_of_Cards();
  }

  @Get()
  findAll() {
    return this.cardService.findAll();
  }

  @Get('/:id')
  findOne(@Param('id') id: number) {
    return this.cardService.findOne(id);
  }

  @Get('filtering_column/:columnId')
  filtering(@Param('columnId') columnId: number) {
    return this.cardService.filteringByColumnId(columnId);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @Roles('admin')
  @UseGuards(JwtAuthGuard, RoleGuard)
  update(@Param('id') id: number, @Body() updateCardDto: UpdateCardDto) {
    return this.cardService.update(id, updateCardDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @Roles('admin')
  @UseGuards(JwtAuthGuard, RoleGuard)
  remove(@Param('id') id: number) {
    return this.cardService.remove(id);
  }
}
