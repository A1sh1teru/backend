import {
  Controller,
  Post,
  Body,
  UseGuards,
  Delete,
  Param,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';

import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { DeleteResult } from 'typeorm';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileStorage } from './storage';

@Controller('user')
@ApiTags('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('avatar', { storage: fileStorage }))
  create(
    @Body()
    createUserDto: CreateUserDto,
    @UploadedFile() avatar: Express.Multer.File,
  ) {
    return this.userService.create(createUserDto, avatar);
  }

  // @Get('find by Id')
  // @ApiBearerAuth()
  // @UseGuards(JwtAuthGuard)
  // findById(@Param('id') id: number) {
  //   return this.userService.findById(id);
  // }

  // @Get('find by username')
  // @UseGuards(JwtAuthGuard)
  // findByUsername(@Param('username') username: string) {
  //   return this.userService.findByUsername(username);
  // }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string): Promise<DeleteResult> {
    return this.userService.delete(+id);
  }
}
