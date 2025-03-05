import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from "typeorm";

@Entity("payments")
export class Payment {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  provider: string;

  @Column()
  amount: number;

  @Column()
  orderId: string;

  @Column()
  status: string;

  @CreateDateColumn()
  createdAt: Date;
}
