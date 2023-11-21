import { Column, Entity } from 'typeorm';
import User from './user.base';
import { IndustriesType } from 'src/utils/enums';

@Entity()
export class Employers extends User {
  @Column()
  companyName: string;

  @Column({ nullable: true })
  employees: string;

  @Column({
    nullable: true,
    type: 'enum',
    enum: IndustriesType,
    default: IndustriesType.Legal,
  })
  industry: IndustriesType;

  @Column({ nullable: true })
  founded: Date;

  @Column({ nullable: true })
  companyDescription: string;

  @Column({ nullable: true })
  companyInfo: string;

  @Column({ nullable: true })
  companyUrl: string;

  @Column({ nullable: true })
  location: string;

  @Column({ default: 'employer' })
  role: string;
}
