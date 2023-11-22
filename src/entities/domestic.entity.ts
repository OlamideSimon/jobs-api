import { Column, Entity } from 'typeorm';
import { Availability, Gender } from 'src/utils/enums';
import Model from './base.entity';

@Entity()
export class DomesticStaff extends Model {
  @Column()
  fName: string;

  @Column()
  lName: string;

  @Column()
  contactInfo: string;

  @Column()
  address: string;

  @Column({ type: 'enum', enum: Gender, default: Gender.Female })
  gender: Gender;

  @Column({ type: 'date' })
  dob: Date;

  @Column()
  nationality: string;

  @Column('text', { array: true, default: ['english'] })
  languages: string[];

  @Column('text', { array: true, nullable: true })
  experience: string[];

  @Column('text', { array: true, nullable: true })
  education: string[];

  @Column('enum', { enum: Availability })
  availability: Availability;

  @Column({ type: 'numeric', precision: 10, scale: 2 })
  salary: number;

  @Column('text', { array: true, nullable: true })
  skills: string[];

  @Column('text', { array: true, nullable: true })
  references: string[];

  @Column({ type: 'text', nullable: true })
  profileUrl: string;

  @Column({ type: 'bytea', nullable: true })
  profileData: Buffer;

  @Column({ default: 'domestic' })
  role: string;
}
