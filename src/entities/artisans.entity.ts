import { Column, Entity, OneToMany } from 'typeorm';
import { Services } from './services.entity';
import Model from './base.entity';

@Entity()
export class Artisans extends Model {
  @Column()
  fName: string;

  @Column()
  lName: string;

  @Column()
  contactInfo: string;

  @Column()
  address: string;

  @Column('text', { array: true, nullable: true })
  skills: string[];

  @Column('text', { array: true, nullable: true })
  experience: string[];

  @Column('text', { array: true, nullable: true })
  portfolio: string[];

  @OneToMany(() => Services, (service) => service.artisan)
  services: Services[];

  @Column()
  location: string;

  @Column({ default: 'artisan' })
  role: string;
}
