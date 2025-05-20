import { Field, ID, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
@ObjectType()
export class Set extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: string;

  @Field()
  @Column({ length: 10 })
  code!: string;

  @Field({ nullable: true })
  @Column({ length: 10, nullable: true })
  mtgo_code!: string;

  @Field({ nullable: true })
  @Column({ length: 10, nullable: true })
  arena_code!: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  tcgplayer_id!: number;

  @Field()
  @Column({ length: 255 })
  name!: string;

  @Field({ nullable: true })
  @Column({ length: 255, nullable: true })
  uri!: string;

  @Field({ nullable: true })
  @Column({ length: 255, nullable: true })
  scryfall_uri!: string;

  @Field({ nullable: true })
  @Column({ length: 255, nullable: true })
  search_uri!: string;

  @Field({ nullable: true })
  @Column({ length: 15, nullable: true })
  released_at!: string;

  @Field({ nullable: true })
  @Column({ length: 100, nullable: true })
  set_type!: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  card_count!: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  printed_size!: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  digital!: boolean;

  @Field({ nullable: true })
  @Column({ nullable: true })
  nonfoil_only!: boolean;

  @Field({ nullable: true })
  @Column({ nullable: true })
  foil_only!: boolean;

  @Field({ nullable: true })
  @Column({ length: 100, nullable: true })
  block_code!: string;

  @Field({ nullable: true })
  @Column({ length: 100, nullable: true })
  block!: string;

  @Field({ nullable: true })
  @Column({ length: 255, nullable: true })
  icon_svg_uri!: string;

  @Field({ nullable: true })
  @Column({ length: 100, nullable: true })
  parent_set_code!: string;
}
