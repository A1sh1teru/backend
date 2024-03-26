import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ConfigModule, ConfigService } from '@nestjs/config';
import { getPostgresConfig } from './configs/postgres.config';
import { CardModule } from './card/card.module';
import { ReviewModule } from './review/review.module';
import { TeamModule } from './team/team.module';
import { QuestionsModule } from './questions/questions.module';
import { ValuedClientsModule } from './valued-clients/valued-clients.module';
import { OfficeLocationModule } from './office-location/office-location.module';
import { CategoryModule } from './category/category.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getPostgresConfig,
    }),
    CardModule,
    ReviewModule,
    TeamModule,
    QuestionsModule,
    ValuedClientsModule,
    OfficeLocationModule,
    CategoryModule,
    UserModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
