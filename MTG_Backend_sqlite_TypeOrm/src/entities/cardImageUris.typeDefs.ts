import { Field, ID, InputType, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@InputType()
export class CardImageUrisInput {
  @Field({})
  small!: string;

  @Field()
  normal!: string;
}

@Entity()
@ObjectType()
export class CardImageUris extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column({ length: 255, nullable: true })
  small!: string;

  @Field()
  @Column({ length: 255, nullable: true })
  normal!: string;
}
