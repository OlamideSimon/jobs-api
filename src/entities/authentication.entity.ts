import * as bcrypt from 'bcrypt';
import { Role } from 'src/types';
import { BeforeInsert, Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import Model from './base.entity';
import { Seekers } from './seekers.entity';
import { Employers } from './employers.entity';

@Entity()
export class UserAuth extends Model {
  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  role: Role;

  @OneToOne(() => Seekers, (seeker) => seeker.userAuth, {
    lazy: true,
    cascade: true,
    nullable: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  seekerDetails: Seekers;

  @OneToOne(() => Employers, (employer) => employer.userAuth, {
    lazy: true,
    cascade: true,
    nullable: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  employerDetails: Employers;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 12);
  }

  toJSON() {
    return { ...this, password: undefined };
  }
}
