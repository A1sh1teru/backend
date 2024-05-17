import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ default: 'name1' })
  username: string;

  @ApiProperty({ default: '123' })
  password: string;

  // @ApiProperty({ default: 'Igor' })
  // firstName: string;

  // @ApiProperty({ default: 'Velichko' })
  // lastName: string;

//   @ApiProperty({
//     type: 'file',
//     properties: {
//       file: {
//         type: 'string',
//         format: 'binary',
//       },
//     },
//   })
//   avatar: Express.Multer.File;
}
