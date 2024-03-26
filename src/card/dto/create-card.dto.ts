import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

export class CreateCardDto {
  @ApiProperty({
    type: 'array',
    items: {
      type: 'string',
      format: 'binary',
    },
  })
  images: Array<Express.Multer.File>;

  @IsString()
  title: string = 'Название жилья';

  @IsString()
  description: string = 'Описание жилья';

  @IsNumber()
  bedroom: number = 5;

  @IsNumber()
  bathroom: number = 5;

  @IsString()
  location: string = 'Местоположение';

  @IsNumber()
  area: number = 100;

  @IsNumber()
  price: number = 100000;

  @IsNumber()
  year: number = 2024;

  @ApiProperty({ type: [String] })
  features: string;

  // @IsNumberString()
  @Type(() => Number)
  @IsNumber()
  categoryId: number;
}
