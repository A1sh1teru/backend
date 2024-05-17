import {
  Controller,
  Request,
  Post,
  UseGuards,
  Body,
  UseInterceptors,
  UploadedFile,
  // Get,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';

import { UserEntity } from 'src/user/entities/user.entity';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileStorage } from './storage';
import { LoginDto } from 'src/user/dto/login.dto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiBearerAuth()
  @UseGuards(LocalAuthGuard)
  @ApiBody({ type: LoginDto })
  async login(@Request() req) {
    return this.authService.login(req.user as UserEntity);
  }

  // @Get('profile')
  // @ApiBearerAuth()
  // @UseGuards(JwtAuthGuard)
  // getProfile(@Request() req) {
  //   return req.user;
  // }

  @Post('register')
  // @ApiConsumes('multipart/form-data')
  // @UseInterceptors(FileInterceptor('avatar', { storage: fileStorage }))
  register(
    @Body() dto: CreateUserDto,
    // @UploadedFile() avatar: Express.Multer.File,
  ) {
    return this.authService.register(dto);
  }
}
