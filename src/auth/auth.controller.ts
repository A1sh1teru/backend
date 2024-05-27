import { Controller, Request, Post, UseGuards, Body } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';

import { UserEntity } from 'src/user/entities/user.entity';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local.guard';
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
  register(@Body() dto: CreateUserDto) {
    return this.authService.register(dto);
  }
}
