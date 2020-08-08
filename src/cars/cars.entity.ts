import {
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  Entity,
  Unique,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';

@Entity()
@Unique(['carId'])
export default class Car extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  carId: string;

  @Column()
  sku: string;

  @Column()
  lotNumber: string;

  @Column()
  vin: string;

  @Column()
  updatedAt: Date;

  @Column()
  createdAt: Date;

  @BeforeInsert()
  setCreatedAndUpdatedAt() {
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  @BeforeUpdate()
  setUpdateAt() {
    this.updatedAt = new Date();
  }
}
