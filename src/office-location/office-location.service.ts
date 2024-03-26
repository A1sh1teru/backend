import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateOfficeLocationDto } from './dto/create-office-location.dto';
import { UpdateOfficeLocationDto } from './dto/update-office-location.dto';
import { OfficeLocationEntity } from './entities/office-location.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class OfficeLocationService {
  constructor(
    @InjectRepository(OfficeLocationEntity)
    private officeLocationRepository: Repository<OfficeLocationEntity>,
  ) {}
  async create(dto: CreateOfficeLocationDto) {
    const office = new OfficeLocationEntity();
    office.address = dto.address;
    office.category = dto.category;
    office.descriprion = dto.descriprion;
    office.email = dto.email;
    office.location = dto.location;
    office.phone = dto.phone;
    const newOffice = await this.officeLocationRepository.save(office);
    return newOffice;
  }

  findOne(id: number) {
    return this.officeLocationRepository.findOneBy({ id });
  }

  async update(
    id: number,
    dto: UpdateOfficeLocationDto,
  ): Promise<OfficeLocationEntity> {
    const toUpdate = await this.officeLocationRepository.findOneBy({ id });
    if (!toUpdate) {
      throw new BadRequestException(`Записи с id=${id} не найдено`);
    }
    if (dto.address) toUpdate.address = dto.address;
    if (dto.category) toUpdate.category = dto.category;
    if (dto.descriprion) toUpdate.descriprion = dto.descriprion;
    if (dto.email) toUpdate.email = dto.email;
    if (dto.phone) toUpdate.phone = dto.phone;
    if (dto.location) toUpdate.location = dto.location;
    return this.officeLocationRepository.save(toUpdate);
  }

  remove(id: number) {
    return this.officeLocationRepository.delete(id);
  }
}
