import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  VersionColumn,
  CreateDateColumn,
  PrimaryColumn,
  BeforeInsert,
  OneToOne,
  JoinColumn
} from 'typeorm';

import * as bcrypt from 'bcrypt'


@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @PrimaryColumn()
  nis: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ default: true })
  isActive: boolean;

  @Column()
  password: string;

  @CreateDateColumn({
    type: 'timestamp with time zone',
    nullable: false,
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp with time zone',
    nullable: false,
  })
  updatedAt: Date;

  @DeleteDateColumn({
    type: 'timestamp with time zone',
    nullable: true,
  })
  deletedAt: Date;

  @BeforeInsert()
    async setPassword(password: string) {

        const salt = bcrypt.genSaltSync();
        this.password = bcrypt.hashSync(password || this.password, salt);
    }

  @VersionColumn()
  version: number;
}
