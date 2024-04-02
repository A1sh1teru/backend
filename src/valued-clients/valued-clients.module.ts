import { Module } from '@nestjs/common';
import { ValuedClientsService } from './valued-clients.service';
import { ValuedClientsController } from './valued-clients.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ValuedClientEntity } from './entities/valued-client.entity';
import { UserModule } from 'src/user/user.module';
import { RolesGuard } from 'src/auth/roles.guard';

@Module({
  imports: [TypeOrmModule.forFeature([ValuedClientEntity]), UserModule],
  controllers: [ValuedClientsController],
  providers: [ValuedClientsService, RolesGuard],
})
export class ValuedClientsModule {}
