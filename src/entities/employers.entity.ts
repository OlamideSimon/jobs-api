import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { IndustriesType } from 'src/utils/enums';
import { Jobs } from './jobs.entity';
import Model from './base.entity';
import { UserAuth } from './authentication.entity';
import { SocialLink } from './employerSocial.entity';

@Entity()
export class Employers extends Model {
  @OneToOne(() => UserAuth, (userAuth) => userAuth.employerDetails)
  userAuth: UserAuth;

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

  @OneToOne(() => SocialLink, { eager: true })
  @JoinColumn()
  socialLink: SocialLink;

  @OneToMany(() => Jobs, (jobs) => jobs.employer, { eager: true })
  jobs: Jobs[];
}
