import { ApiProperty } from '@nestjs/swagger';

export class CreateValuedClientDto {
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
