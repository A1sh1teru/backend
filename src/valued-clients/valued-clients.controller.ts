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
import { ValuedClientsService } from './valued-clients.service';
import { CreateValuedClientDto } from './dto/create-valued-client.dto';
import { UpdateValuedClientDto } from './dto/update-valued-client.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ValuedClientEntity } from './entities/valued-client.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';

@ApiTags('valued-clients')
@Controller('valued-clients')
export class ValuedClientsController {
  constructor(private readonly valuedClientsService: ValuedClientsService) {}

  @Post('create')
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Roles('admin')
  @UseGuards(JwtAuthGuard)
  create(@Body() dto: CreateValuedClientDto): Promise<ValuedClientEntity> {
    return this.valuedClientsService.create(dto);
  }

  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.valuedClientsService.findOne(+id);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Roles('admin')
  @UseGuards(JwtAuthGuard)
  update(
    @Param('id') id: string,
    @Body() dto: UpdateValuedClientDto,
  ): Promise<ValuedClientEntity> {
    return this.valuedClientsService.update(+id, dto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.valuedClientsService.remove(+id);
  }
}
