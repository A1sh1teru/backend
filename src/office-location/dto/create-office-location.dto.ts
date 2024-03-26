import { IsEmail, IsPhoneNumber, IsString } from 'class-validator';

export class CreateOfficeLocationDto {
  @IsString()
  address: string;

  @IsString()
  category: string;

  @IsString()
  descriprion: string;

  @IsEmail()
  email: string;

  @IsPhoneNumber('RU')
  phone: string;

  @IsString()
  location: string;
}
