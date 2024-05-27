import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';

import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private repository: Repository<UserEntity>,
    private readonly jwtService: JwtService,
  ) {}

  async hashPassword(password) {
    const saltOrRounds = 10;
    return bcrypt.hash(password, saltOrRounds);
  }

  async generateToken(user: UserEntity) {
    const payload = { username: user.username };
    return this.jwtService.sign(payload);
  }

  async create(
    dto: CreateUserDto,
    // avatar: Express.Multer.File,
  ): Promise<UserEntity> {
    const existingUser = await this.findByUsername(dto.username);

    dto.password = await this.hashPassword(dto.password);

    if (existingUser) {
      throw new BadRequestException(
        `Пользователь ${dto.username} уже существует`,
      );
    }

    const newUser = new UserEntity();
    newUser.username = dto.username;
    newUser.password = dto.password;
    // newUser.firstName = dto.firstName;
    // newUser.lastName = dto.lastName;
    // newUser.avatar = avatar.filename;

    newUser.token = await this.generateToken(newUser);

    return this.repository.save(newUser);
  }

  async findByUsername(username: string) {
    return this.repository.findOneBy({ username });
  }

  async findById(id: number) {
    return this.repository.findOneBy({ id });
  }

  async delete(id: number): Promise<DeleteResult> {
    return this.repository.delete(id);
  }

  async findAll() {
    return this.repository.find();
  }
}
