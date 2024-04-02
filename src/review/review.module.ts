import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { ReviewEntity } from './entities/review.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { UserModule } from 'src/user/user.module';
import { RolesGuard } from 'src/auth/roles.guard';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([ReviewEntity, UserEntity]),
    UserModule,
  ],
  controllers: [ReviewController],
  providers: [ReviewService, RolesGuard],
})
export class ReviewModule {}
