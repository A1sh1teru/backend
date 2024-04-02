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
import { OfficeLocationService } from './office-location.service';
import { CreateOfficeLocationDto } from './dto/create-office-location.dto';
import { UpdateOfficeLocationDto } from './dto/update-office-location.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { OfficeLocationEntity } from './entities/office-location.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';

@ApiTags('office-location')
@Controller('office-location')
export class OfficeLocationController {
  constructor(private readonly officeLocationService: OfficeLocationService) {}

  @Post('create')
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Roles('admin')
  @UseGuards(JwtAuthGuard)
  async create(@Body() dto: CreateOfficeLocationDto) {
    return this.officeLocationService.create(dto);
  }

  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.officeLocationService.findOne(+id);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Roles('admin')
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateOfficeLocationDto,
  ): Promise<OfficeLocationEntity> {
    return this.officeLocationService.update(+id, dto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Roles('admin')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.officeLocationService.remove(+id);
  }
}
