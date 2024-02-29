import { BadRequestException, Injectable } from '@nestjs/common';
import { DeleteResult, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as fs from 'fs';

import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { CardEntity } from './entities/card.entity';
import { CategoryEntity } from 'src/category/entities/category.entity';

@Injectable()
export class CardService {
  constructor(
    @InjectRepository(CardEntity)
    private cardRepository: Repository<CardEntity>,

    @InjectRepository(CategoryEntity)
    private categoryRepository: Repository<CategoryEntity>,
  ) {}

  async create(
    dto: CreateCardDto,
    image: Express.Multer.File,
  ): Promise<CardEntity> {
    const card = new CardEntity();
    card.image = image.filename;
    card.title = dto.title;
    card.description = dto.description;
    card.area = dto.area;
    card.bathroom = dto.bathroom;
    card.bedroom = dto.bedroom;
    card.location = dto.location;
    card.price = dto.price;
    card.year = dto.year;
    card.features = dto.features.split(',');

    const newCard = await this.cardRepository.save(card);

    const category = await this.categoryRepository.findOne({
      where: { id: dto.categoryId },
      relations: ['cards'],
    });

    category.cards.push(card);

    await this.categoryRepository.save(category);

    return newCard;
  }

  async findAll(): Promise<CardEntity[]> {
    return this.cardRepository.find();
  }

  async findOne(id: number): Promise<CardEntity> {
    return this.cardRepository.findOneBy({ id });
  }

  async findByCategoryId(categoryId: number): Promise<CardEntity[]> {
    return this.cardRepository
      .createQueryBuilder('card')
      .leftJoinAndSelect('card.category', 'category')
      .where('card.categoryId = :categoryId', { categoryId })
      .getMany();
  }

  async update(
    id: number,
    dto: UpdateCardDto,
    image: Express.Multer.File,
  ): Promise<CardEntity> {
    const toUpdate = await this.cardRepository.findOneBy({ id });
    if (!toUpdate) {
      throw new BadRequestException(`Записи с id=${id} не найдено`);
    }
    if (dto.title) toUpdate.title = dto.title;
    if (dto.description) toUpdate.description = dto.description;
    if (dto.area) toUpdate.area = dto.area;
    if (dto.bathroom) toUpdate.bathroom = dto.bathroom;
    if (dto.bedroom) toUpdate.bedroom = dto.bedroom;
    if (dto.location) toUpdate.location = dto.location;
    if (dto.price) toUpdate.price = dto.price;
    if (dto.year) toUpdate.year = dto.year;
    if (dto.features) toUpdate.features = dto.features.split(',');
    if (dto.categoryId) {
      const category = await this.categoryRepository.findOne({
        where: { id: dto.categoryId },
        relations: ['cards'],
      });
      toUpdate.category = category;
    }
    if (image) {
      if (toUpdate.image[0] !== image.filename) {
        fs.unlink(`db_images/card/${toUpdate.image}`, (err) => {
          if (err) {
            console.error(err);
          }
        });
      }
      toUpdate.image = image.filename;
    }

    return this.cardRepository.save(toUpdate);
  }

  async delete(id: number): Promise<DeleteResult> {
    return this.cardRepository.delete(id);
  }
}
