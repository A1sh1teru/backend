import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString, IsString } from 'class-validator';

export class CreateCardDto {
  // @ApiProperty({
  //   type: 'file',
  //   properties: {
  //     file: {
  //       type: 'string',
  //       format: 'binary',
  //     },
  //   },
  // })
  // image: string;
  // image: Array<Express.Multer.File>;
  @IsString()
  image: string;

  @IsString()
  title: string = 'Название жилья';

  @IsString()
  description: string = 'Описание жилья';

  @IsString()
  bedroom: string = 'Количество спален';

  @IsString()
  bathroom: string = 'Количество ванных комнат';

  @IsString()
  location: string = 'Местоположение';

  @IsString()
  area: string = 'Площадь недвижимости';

  @IsString()
  price: string = 'Стоимость';

  @IsString()
  year: string = 'Год постройки';

  @IsString()
  features: string = 'array';

  @IsNumberString()
  categoryId: number;
}
