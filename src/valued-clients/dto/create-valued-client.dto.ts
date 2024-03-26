// import { ApiProperty } from '@nestjs/swagger';

import { IsNumber, IsString } from 'class-validator';

export class CreateValuedClientDto {
  @IsString()
  company: string;

  @IsNumber()
  year: number;

  @IsString()
  domain: string;

  @IsString()
  category: string;

  @IsString()
  comment: string;

  @IsString()
  website: string;
}
