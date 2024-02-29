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

@ApiTags('valued-clients')
@Controller('valued-clients')
export class ValuedClientsController {
  constructor(private readonly valuedClientsService: ValuedClientsService) {}

  @Post()
  create(@Body() createValuedClientDto: CreateValuedClientDto) {
    return this.valuedClientsService.create(createValuedClientDto);
  }

  @Get()
  findAll() {
    return this.valuedClientsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.valuedClientsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateValuedClientDto: UpdateValuedClientDto,
  ) {
    return this.valuedClientsService.update(+id, updateValuedClientDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.valuedClientsService.remove(+id);
  }
}
