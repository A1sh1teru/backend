import { ApiProperty } from '@nestjs/swagger';

export class CreateOfficeLocationDto {
  @ApiProperty({
    type: 'file',
    properties: {
      file: {
        type: 'string',
        format: 'binary',
      },
    },
  })
  title: string;
}
