import { Injectable } from '@nestjs/common';
import { CreateTeamDto } from './dto/create-team.dto';
import { TeamEntity } from './entities/team.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TeamService {
  constructor(
    @InjectRepository(TeamEntity)
    private teamRepository: Repository<TeamEntity>,
  ) {}
  async create(
    dto: CreateTeamDto,
    avatar: Express.Multer.File,
  ): Promise<TeamEntity> {
    const team = new TeamEntity();
    team.avatar = avatar.filename;
    team.name = dto.name;
    team.surname = dto.surname;
    team.position = dto.position;
    team.vk = dto.vk;
    const newTeam = await this.teamRepository.save(team);

    return newTeam;
  }
  async findOne(id: number): Promise<TeamEntity> {
    return this.teamRepository.findOneBy({ id });
  }

  remove(id: number) {
    return this.teamRepository.delete(id);
  }
}
