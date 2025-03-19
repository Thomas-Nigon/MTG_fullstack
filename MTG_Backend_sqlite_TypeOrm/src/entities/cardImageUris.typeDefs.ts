import { Field, ID, InputType, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@InputType()
export class CardImageUrisInput {
  @Field({})
  small!: string;

  @Field()
  normal!: string;

  @Field()
  large!: string;

  @Field()
  png!: string;
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

  @Field()
  @Column({ length: 255, nullable: true })
  large!: string;

  @Field()
  @Column({ length: 255, nullable: true })
  png!: string;

  @Field()
  @Column({ length: 255, nullable: true })
  art_crop!: string;

  @Field()
  @Column({ length: 255, nullable: true })
  border_crop!: string;
}
