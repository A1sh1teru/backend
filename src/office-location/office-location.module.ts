import { Module } from '@nestjs/common';
import { OfficeLocationService } from './office-location.service';
import { OfficeLocationController } from './office-location.controller';

@Module({
  controllers: [OfficeLocationController],
  providers: [OfficeLocationService],
})
export class OfficeLocationModule {}
