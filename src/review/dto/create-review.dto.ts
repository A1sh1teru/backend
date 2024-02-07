import { IsString } from 'class-validator';

export class CreateReviewDto {
  @IsString()
  name: string;
}
