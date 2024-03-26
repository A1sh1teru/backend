import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ValuedClientsService } from './valued-clients.service';
import { CreateValuedClientDto } from './dto/create-valued-client.dto';
import { UpdateValuedClientDto } from './dto/update-valued-client.dto';
import { ApiTags } from '@nestjs/swagger';
import { ValuedClientEntity } from './entities/valued-client.entity';

@ApiTags('valued-clients')
@Controller('valued-clients')
export class ValuedClientsController {
  constructor(private readonly valuedClientsService: ValuedClientsService) {}

  @Post('create')
  create(@Body() dto: CreateValuedClientDto): Promise<ValuedClientEntity> {
    return this.valuedClientsService.create(dto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.valuedClientsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateValuedClientDto,
  ): Promise<ValuedClientEntity> {
    return this.valuedClientsService.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.valuedClientsService.remove(+id);
  }
}
