import { Module } from '@nestjs/common';
import { ValuedClientsService } from './valued-clients.service';
import { ValuedClientsController } from './valued-clients.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ValuedClientEntity } from './entities/valued-client.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ValuedClientEntity])],
  controllers: [ValuedClientsController],
  providers: [ValuedClientsService],
})
export class ValuedClientsModule {}
