import { Column, Entity, OneToOne } from 'typeorm';
import Model from './base.entity';
import { Employers } from './employers.entity';

@Entity()
export class SocialLink extends Model {
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

  @OneToOne(() => Employers)
  employer: Employers;
}
