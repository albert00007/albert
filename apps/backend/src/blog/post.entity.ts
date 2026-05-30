import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';
import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity()
export class Post {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  title: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  excerpt: string;

  @Field()
  @Column('text')
  content: string;

  @Field()
  @Column({ unique: true })
  slug: string;

  @Field()
  @CreateDateColumn()
  createdAt: Date;
}
