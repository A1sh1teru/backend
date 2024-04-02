import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryEntity } from './entities/category.entity';
import { RolesGuard } from 'src/auth/roles.guard';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([CategoryEntity]),
    UserModule,
  ],
  controllers: [CategoryController],
  providers: [CategoryService, RolesGuard],
})
export class CategoryModule {}
