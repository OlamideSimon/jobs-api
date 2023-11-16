import { Injectable } from '@nestjs/common';
import { SeekerDTO } from 'src/dto/create/seeker.dto';
import { UpdateSeekerDTO } from 'src/dto/update/seeker.dto';

@Injectable()
export class SeekerService {
  async createNewSeeker(seekerDto: SeekerDTO) {
    return { seekerDto };
  }

  async upDateSeeker(seekerDto: UpdateSeekerDTO) {
    return { seekerDto };
  }

  async getSeeker(id: string) {
    return id;
  }
}