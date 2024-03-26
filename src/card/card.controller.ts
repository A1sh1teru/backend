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
} from '@nestjs/common';
import { ApiTags, ApiConsumes, ApiQuery } from '@nestjs/swagger';
import { FilesInterceptor } from '@nestjs/platform-express';

import { CardService } from './card.service';
import { fileStorage } from './storage';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { CardEntity } from './entities/card.entity';
import { DeleteResult } from 'typeorm';

@ApiTags('card')
@Controller('card')
export class CardController {
  constructor(private readonly cardService: CardService) {}

  @Post('create')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FilesInterceptor('images', 10, { storage: fileStorage }))
  create(
    @Body()
    dto: CreateCardDto,
    @UploadedFiles() images: Array<Express.Multer.File>,
  ): Promise<CardEntity> {
    return this.cardService.create(dto, images);
  }

  @Get('findAllByCategoryId')
  @ApiQuery({ name: 'categoryId', required: false })
  findAll(@Query('categoryId') categoryId: number): Promise<CardEntity[]> {
    if (categoryId) return this.cardService.findByCategoryId(categoryId);
    else return this.cardService.findAll();
  }

  @Get('/image/:path')
  download(@Param('path') path: string, @Response() response) {
    return response.sendFile(path, { root: './db_images/card' });
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<CardEntity> {
    return this.cardService.findOne(+id);
  }

  @Patch(':id')
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
  remove(@Param('id') id: string): Promise<DeleteResult> {
    return this.cardService.delete(+id);
  }
}
