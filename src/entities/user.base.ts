import { BeforeInsert, Column, Index } from 'typeorm';
import Model from './base.entity';
import * as bcrypt from 'bcrypt';

export default abstract class User extends Model {
  @Column()
  password: string;

  @Column({ unique: true })
  @Index({ unique: true })
  email: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 12);
  }
}
