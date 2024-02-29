import { Injectable } from '@nestjs/common';
import { CreateValuedClientDto } from './dto/create-valued-client.dto';
import { UpdateValuedClientDto } from './dto/update-valued-client.dto';

@Injectable()
export class ValuedClientsService {
  create(createValuedClientDto: CreateValuedClientDto) {
    return 'This action adds a new valuedClient';
  }

  findAll() {
    return `This action returns all valuedClients`;
  }

  findOne(id: number) {
    return `This action returns a #${id} valuedClient`;
  }

  update(id: number, updateValuedClientDto: UpdateValuedClientDto) {
    return `This action updates a #${id} valuedClient`;
  }

  remove(id: number) {
    return `This action removes a #${id} valuedClient`;
  }
}
