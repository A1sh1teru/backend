import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { OfficeLocationService } from './office-location.service';
import { CreateOfficeLocationDto } from './dto/create-office-location.dto';
import { UpdateOfficeLocationDto } from './dto/update-office-location.dto';
import { ApiTags } from '@nestjs/swagger';
import { OfficeLocationEntity } from './entities/office-location.entity';

@ApiTags('office-location')
@Controller('office-location')
export class OfficeLocationController {
  constructor(private readonly officeLocationService: OfficeLocationService) {}

  @Post('create')
  async create(@Body() dto: CreateOfficeLocationDto) {
    return this.officeLocationService.create(dto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.officeLocationService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateOfficeLocationDto,
  ): Promise<OfficeLocationEntity> {
    return this.officeLocationService.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.officeLocationService.remove(+id);
  }
}
