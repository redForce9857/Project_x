import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { ColumnService } from './column.service';
import { CreateColumnDto } from './dto/create-column.dto';
import { UpdateColumnDto } from './dto/update-column.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from '../auth/decorators/role.decorator';
import { JwtAuthGuard } from '../auth/guard/auth_jwt_guards';
import { RoleGuard } from '../auth/guard/auth_role_guards';

@ApiTags('Column')
@Controller('column')
export class ColumnController {
  constructor(private readonly columnService: ColumnService) {}

  @Post()
  @ApiBearerAuth()
  @Roles('admin')
  @UseGuards(JwtAuthGuard, RoleGuard)
  create(@Body() createColumnDto: CreateColumnDto) {
    return this.columnService.create(createColumnDto);
  }

  @Get()
  findAll() {
    return this.columnService.findAll();
  }

  @Get('/column_cards')
  findColumnCards() {
    return this.columnService.get_Columns_of_Cards();
  }

  @Get('/:id')
  findOne(@Param('id') id: number) {
    return this.columnService.findOne(id);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @Roles('admin')
  @UseGuards(JwtAuthGuard, RoleGuard)
  update(@Param('id') id: number, @Body() updateColumnDto: UpdateColumnDto) {
    return this.columnService.update(id, updateColumnDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @Roles('admin')
  @UseGuards(JwtAuthGuard, RoleGuard)
  remove(@Param('id') id: number) {
    return this.columnService.remove(id);
  }
}
