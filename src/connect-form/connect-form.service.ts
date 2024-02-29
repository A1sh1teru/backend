import { Injectable } from '@nestjs/common';
import { CreateConnectFormDto } from './dto/create-connect-form.dto';
import { UpdateConnectFormDto } from './dto/update-connect-form.dto';

@Injectable()
export class ConnectFormService {
  create(createConnectFormDto: CreateConnectFormDto) {
    return 'This action adds a new connectForm';
  }

  findAll() {
    return `This action returns all connectForm`;
  }

  findOne(id: number) {
    return `This action returns a #${id} connectForm`;
  }

  update(id: number, updateConnectFormDto: UpdateConnectFormDto) {
    return `This action updates a #${id} connectForm`;
  }

  remove(id: number) {
    return `This action removes a #${id} connectForm`;
  }
}
