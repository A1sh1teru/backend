import { Module } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { QuestionsController } from './questions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionsEntity } from './entities/question.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { UserModule } from 'src/user/user.module';
import { RolesGuard } from 'src/auth/roles.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([QuestionsEntity, UserEntity]),
    UserModule,
  ],
  controllers: [QuestionsController],
  providers: [QuestionsService, RolesGuard],
})
export class QuestionsModule {}
