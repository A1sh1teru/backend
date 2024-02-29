import { PartialType } from '@nestjs/swagger';
import { CreateConnectFormDto } from './create-connect-form.dto';

export class UpdateConnectFormDto extends PartialType(CreateConnectFormDto) {}
