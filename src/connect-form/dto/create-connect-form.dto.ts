import { ApiProperty } from '@nestjs/swagger';

export class CreateConnectFormDto {
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
