import { Column, Entity, ManyToOne } from 'typeorm';
import Model from './base.entity';
import { Artisans } from './artisans.entity';

@Entity()
export class Services extends Model {
  @ManyToOne(() => Artisans)
  artisan: Artisans;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ type: 'numeric', precision: 10, scale: 2 })
  price: number;
}
