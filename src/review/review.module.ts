import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { ReviewEntity } from './entities/review.entity';
import { UserEntity } from 'src/user/entities/user.entity';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([ReviewEntity, UserEntity])],
  controllers: [ReviewController],
  providers: [ReviewService],
})
export class ReviewModule {}
