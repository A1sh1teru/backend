import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, Max, Min } from 'class-validator';

export class CreateReviewDto {
  @ApiProperty({ default: 'Igor' })
  firstName: string;

  @ApiProperty({ default: 'Velichko' })
  lastName: string;

  @ApiProperty({
    type: 'file',
    properties: {
      file: {
        type: 'string',
        format: 'binary',
      },
    },
  })
  avatar: Express.Multer.File;

  @IsString()
  comment: string;

  @IsString()
  title: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Max(5)
  rating: number;

  // @ApiHideProperty()
  @IsNumber()
  userId: number;
}
