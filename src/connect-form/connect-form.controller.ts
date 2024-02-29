import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ConnectFormService } from './connect-form.service';
import { CreateConnectFormDto } from './dto/create-connect-form.dto';
import { UpdateConnectFormDto } from './dto/update-connect-form.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('connect-form')
@Controller('connect-form')
export class ConnectFormController {
  constructor(private readonly connectFormService: ConnectFormService) {}

  @Post()
  create(@Body() createConnectFormDto: CreateConnectFormDto) {
    return this.connectFormService.create(createConnectFormDto);
  }

  @Get()
  findAll() {
    return this.connectFormService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.connectFormService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateConnectFormDto: UpdateConnectFormDto,
  ) {
    return this.connectFormService.update(+id, updateConnectFormDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.connectFormService.remove(+id);
  }
}
