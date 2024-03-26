import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateTeamDto {
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
  name: string;

  @IsString()
  surname: string;

  @IsString()
  position: string;

  @IsString()
  vk: string;
}
