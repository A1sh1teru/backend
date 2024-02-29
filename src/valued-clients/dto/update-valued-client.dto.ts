import { PartialType } from '@nestjs/swagger';
import { CreateValuedClientDto } from './create-valued-client.dto';

export class UpdateValuedClientDto extends PartialType(CreateValuedClientDto) {}
