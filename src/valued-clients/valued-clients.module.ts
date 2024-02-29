import { Module } from '@nestjs/common';
import { ValuedClientsService } from './valued-clients.service';
import { ValuedClientsController } from './valued-clients.controller';

@Module({
  controllers: [ValuedClientsController],
  providers: [ValuedClientsService],
})
export class ValuedClientsModule {}
