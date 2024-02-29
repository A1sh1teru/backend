import { Module } from '@nestjs/common';
import { ConnectFormService } from './connect-form.service';
import { ConnectFormController } from './connect-form.controller';

@Module({
  controllers: [ConnectFormController],
  providers: [ConnectFormService],
})
export class ConnectFormModule {}
