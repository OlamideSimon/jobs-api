import { PartialType } from '@nestjs/swagger';
import { SeekerDTO } from '../create/seeker.dto';

export class UpdateSeekerDTO extends PartialType(SeekerDTO) {}
