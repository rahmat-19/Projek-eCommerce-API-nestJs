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
  JoinColumn,
  ManyToOne
} from 'typeorm';

import * as bcrypt from 'bcrypt'
import { text } from 'stream/consumers';
import { Role } from 'src/role/entities/role.entities';


@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @PrimaryColumn()
  nis: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({
    nullable: true,
  })
  jurusan: string;

  @Column({
    type: 'text',
    nullable: true
  })
  password: string;

  @Column({
    nullable: true,
  })
  salt: string;

  @Column({ default: true })
  isActive: boolean;

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

  // @BeforeInsert()
  //   async setPassword(password: string) {
  //     this.password = bcrypt.hashSync(password || this.password, this.salt);
  //   }

  @VersionColumn()
  version: number;

  @ManyToOne(
    () => {
      return Role;
    },
    (role) => {
      return role.id;
    },
  )
  role: Role;
}
