import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { CardService } from './card.service';
import { CardController } from './card.controller';
import { CardEntity } from './entities/card.entity';
import { CategoryEntity } from 'src/category/entities/category.entity';
import { CategoryModule } from 'src/category/category.module';
import { RolesGuard } from 'src/auth/roles.guard';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([CardEntity, CategoryEntity]),
    CategoryModule,
    UserModule,
  ],
  controllers: [CardController],
  providers: [CardService, RolesGuard],
})
export class CardModule {}
