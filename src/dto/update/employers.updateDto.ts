import { PartialType } from '@nestjs/swagger';
import { CreateEmployersDTO } from '../create/employers.createDto';

export class UpdateEmployersDTO extends PartialType(CreateEmployersDTO) {}
