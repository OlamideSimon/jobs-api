import { Column, Entity, OneToMany, OneToOne } from 'typeorm';
import User from './user.base';
import { IndustriesType } from 'src/utils/enums';
import { Jobs } from './jobs.entity';

@Entity()
export class Employers extends User {
  @Column()
  company_name: string;

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

  // @Column({ nullable: true })
  // companyInfo: string;

  @Column({ nullable: true })
  companyUrl: string;

  @Column({ nullable: true })
  location: string;

  @Column({ default: 'employer' })
  role: string;

  @OneToOne(() => SocialLink, { eager: true })
  socialLink: SocialLink;

  @OneToMany(() => Jobs, (jobs) => jobs.employer, { eager: true })
  jobs: Jobs[];
}

@Entity()
export class SocialLink {
  @Column({ nullable: true })
  instagram: string;

  @Column({ nullable: true })
  facebook: string;

  @Column({ nullable: true })
  twitter: string;

  @Column({ nullable: true })
  linkedin: string;

  @Column({ nullable: true })
  youtube: string;
}
