import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  Response,
  Query,
  UploadedFiles,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiConsumes, ApiQuery, ApiBearerAuth } from '@nestjs/swagger';
import { FilesInterceptor } from '@nestjs/platform-express';

import { CardService } from './card.service';
import { fileStorage } from './storage';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { CardEntity } from './entities/card.entity';
import { DeleteResult } from 'typeorm';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';

@ApiTags('card')
@Controller('card')
export class CardController {
  constructor(private readonly cardService: CardService) {}

  @Post('create')
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Roles('admin')
  @UseGuards(JwtAuthGuard)
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FilesInterceptor('images', 11, { storage: fileStorage }))
  create(
    @Body()
    dto: CreateCardDto,
    @UploadedFiles() images: Array<Express.Multer.File>,
  ): Promise<CardEntity> {
    return this.cardService.create(dto, images);
  }

  @Get('findAllByCategoryId')
  // @ApiBearerAuth()
  // @UseGuards(JwtAuthGuard)
  @ApiQuery({ name: 'categoryId', required: false })
  findAllByCategory(
    @Query('categoryId') categoryId: number,
  ): Promise<CardEntity[]> {
    if (categoryId) return this.cardService.findByCategoryId(categoryId);
    else return this.cardService.findAllByCategory();
  }

  @Get('/image/:path')
  // @ApiBearerAuth()
  // @UseGuards(JwtAuthGuard)
  download(@Param('path') path: string, @Response() response) {
    return response.sendFile(path, { root: './db_images/card' });
  }

  @Get(':id')
  // @ApiBearerAuth()
  // @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string): Promise<CardEntity> {
    return this.cardService.findOne(+id);
  }

  @Get()
  findAll() {
    return this.cardService.findAll();
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Roles('admin')
  @UseGuards(JwtAuthGuard)
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FilesInterceptor('images', 10, { storage: fileStorage }))
  update(
    @Param('id') id: string,
    @Body() dto: UpdateCardDto,
    @UploadedFiles() images: Array<Express.Multer.File>,
  ): Promise<CardEntity> {
    return this.cardService.update(+id, dto, images);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Roles('admin')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string): Promise<DeleteResult> {
    return this.cardService.delete(+id);
  }
}
