import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';
import { Field, Int, ObjectType, InputType } from '@nestjs/graphql';

@ObjectType()
@Entity()
export class Inquiry {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  email: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  phone: string;

  @Field()
  @Column('text')
  message: string;

  @Field()
  @CreateDateColumn()
  createdAt: Date;
}

@InputType()
export class CreateInquiryInput {
  @Field()
  name: string;

  @Field()
  email: string;

  @Field({ nullable: true })
  phone?: string;

  @Field()
  message: string;
}
