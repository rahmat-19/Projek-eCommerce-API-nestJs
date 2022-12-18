import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  VersionColumn,
  CreateDateColumn,
  PrimaryColumn,
  ManyToOne
} from 'typeorm';

import { Role } from 'src/role/entities/role.entities';
import { Department } from './department.entity';


@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nis: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

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

  @ManyToOne(
    () => {
      return Role;
    },
    (role) => {
      return role.id;
    },
  )
  role: Role;

  @ManyToOne(
    () => {
      return Department;
    },
    (department) => {
      return department.code
    }
  )
  department: Department;

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

  @VersionColumn()
  version: number;
}
