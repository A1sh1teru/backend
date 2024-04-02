import { Module } from '@nestjs/common';
import { TeamService } from './team.service';
import { TeamController } from './team.controller';
import { TeamEntity } from './entities/team.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';
import { RolesGuard } from 'src/auth/roles.guard';

@Module({
  imports: [TypeOrmModule.forFeature([TeamEntity]), UserModule],
  controllers: [TeamController],
  providers: [TeamService, RolesGuard],
})
export class TeamModule {}
