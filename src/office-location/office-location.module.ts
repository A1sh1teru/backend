import { Module } from '@nestjs/common';
import { OfficeLocationService } from './office-location.service';
import { OfficeLocationController } from './office-location.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OfficeLocationEntity } from './entities/office-location.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OfficeLocationEntity])],
  controllers: [OfficeLocationController],
  providers: [OfficeLocationService],
})
export class OfficeLocationModule {}
