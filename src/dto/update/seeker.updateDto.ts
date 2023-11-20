import { PartialType } from '@nestjs/swagger';
import { SeekerDTO } from '../create/seeker.createDto';

export class UpdateSeekerDTO extends PartialType(SeekerDTO) {}
