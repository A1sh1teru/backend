import { Module } from '@nestjs/common';
import { OfficeLocationService } from './office-location.service';
import { OfficeLocationController } from './office-location.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OfficeLocationEntity } from './entities/office-location.entity';
import { UserModule } from 'src/user/user.module';
import { RolesGuard } from 'src/auth/roles.guard';

@Module({
  imports: [TypeOrmModule.forFeature([OfficeLocationEntity]), UserModule],
  controllers: [OfficeLocationController],
  providers: [OfficeLocationService, RolesGuard],
})
export class OfficeLocationModule {}
