import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  Response,
  Query,
  UploadedFiles,
} from '@nestjs/common';
import { ApiTags, ApiConsumes, ApiQuery, ApiBody } from '@nestjs/swagger';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';

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

  @Post()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image'))
  create(
    @Body()
    dto: CreateCardDto,
    @UploadedFiles() image: Express.Multer.File,
  ): Promise<CardEntity> {
    return this.cardService.create(dto, image);
  }

  // @Post()
  // @UseInterceptors(FilesInterceptor('image'))
  // @ApiConsumes('multipart/form-data')
  // @ApiBody({
  //   schema: {
  //     type: 'object',
  //     properties: {
  //       files: {
  //         type: 'array',
  //         items: {
  //           type: 'string',
  //           format: 'binary',
  //         },
  //       },
  //     },
  //   },
  // })
  // async create(@Body() dto: CreateCardDto) {}
  // uploadFiles(@UploadedFiles() image: Array<Express.Multer.File>,
  // ): Promise<CardEntity> {
  //   return this.cardService.create(dto, image);
  // }

  @Get()
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
  @UseInterceptors(FileInterceptor('image', { storage: fileStorage }))
  update(
    @Param('id') id: string,
    @Body() dto: UpdateCardDto,
    @UploadedFile() image: Express.Multer.File,
  ): Promise<CardEntity> {
    return this.cardService.update(+id, dto, image);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<DeleteResult> {
    return this.cardService.delete(+id);
  }
}
