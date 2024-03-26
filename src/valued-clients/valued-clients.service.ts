import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateValuedClientDto } from './dto/create-valued-client.dto';
import { UpdateValuedClientDto } from './dto/update-valued-client.dto';
import { ValuedClientEntity } from './entities/valued-client.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ValuedClientsService {
  constructor(
    @InjectRepository(ValuedClientEntity)
    private valuedClientRepository: Repository<ValuedClientEntity>,
  ) {}
  async create(dto: CreateValuedClientDto) {
    const client = new ValuedClientEntity();
    client.year = +dto.year;
    client.category = dto.category;
    client.comment = dto.comment;
    client.company = dto.company;
    client.domain = dto.domain;
    client.website = dto.website;
    const newValuedClient = await this.valuedClientRepository.save(client);

    return newValuedClient;
  }

  findOne(id: number) {
    return this.valuedClientRepository.findOneBy({ id });
  }

  async update(
    id: number,
    dto: UpdateValuedClientDto,
  ): Promise<ValuedClientEntity> {
    const toUpdate = await this.valuedClientRepository.findOneBy({ id });
    if (!toUpdate) {
      throw new BadRequestException(`Записи с id=${id} не найдено`);
    }
    if (dto.company) toUpdate.company = dto.company;
    if (dto.year) toUpdate.year = dto.year;
    if (dto.domain) toUpdate.domain = dto.domain;
    if (dto.category) toUpdate.category = dto.category;
    if (dto.comment) toUpdate.comment = dto.comment;
    if (dto.website) toUpdate.website = dto.website;

    return this.valuedClientRepository.save(toUpdate);
  }

  remove(id: number) {
    return this.valuedClientRepository.delete(id);
  }
}
