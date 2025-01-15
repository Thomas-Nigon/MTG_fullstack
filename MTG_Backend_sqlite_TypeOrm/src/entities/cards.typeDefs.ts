import { Field, ID, InputType, ObjectType } from "type-graphql";
import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  OneToOne,
  OneToMany,
} from "typeorm";
import { CardStack, CardStackInput } from "./cardStack.typeDefs";
import { CardImageUris, CardImageUrisInput } from "./cardImageUris.typeDefs";
import { CardPrice, CardPriceInput } from "./CardPrice.typeDefs";

@InputType()
export class CardQuery {
  @Field({ nullable: true })
  rarity?: string;
  @Field({ nullable: true })
  colors?: string;
  @Field({ nullable: true })
  set?: string;
  @Field({ nullable: true })
  currentPage?: number;
  @Field({ nullable: true })
  size?: number;
  @Field({ nullable: true })
  type?: string;
}

@InputType()
export class CardInput {
  @Field()
  id!: string;

  @Field()
  card_id?: string;

  @Field({ nullable: true })
  oracle_id?: string;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  lang?: string;

  @Field({ nullable: true })
  released_at?: string;

  @Field(() => CardImageUrisInput, { nullable: true })
  image_uris?: CardImageUrisInput;

  @Field({ nullable: true })
  mana_cost?: string;

  @Field({ nullable: true })
  cmc?: number;

  @Field({ nullable: true })
  type_line?: string;

  @Field(() => [String], { nullable: true })
  colors?: string[];

  @Field(() => [String], { nullable: true })
  color_identity?: string[];

  @Field(() => [String], { nullable: true })
  produced_mana?: string[];

  @Field({ nullable: true })
  set?: string;

  @Field({ nullable: true })
  set_name?: string;

  @Field({ nullable: true })
  rarity?: string;

  @Field({ nullable: true })
  border_color?: string;

  @Field(() => CardPriceInput, { nullable: true })
  prices?: CardPriceInput;

  @Field(() => [CardStackInput])
  cardStacks?: CardStackInput[];
}

@Entity()
@ObjectType()
export class Card extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column({ length: 255, nullable: true })
  card_id!: string;

  @Field()
  @Column({ length: 255, nullable: true })
  oracle_id!: string;

  @Field()
  @Column({ length: 255, nullable: true })
  name!: string;

  @Field()
  @Column({ length: 255, nullable: true })
  lang!: string;

  @Field()
  @Column({ length: 255, nullable: true })
  released_at!: string;

  @Field(() => CardImageUris)
  @OneToOne(() => CardImageUris, { cascade: true, eager: true, nullable: true })
  @JoinColumn()
  image_uris!: CardImageUris;

  @Field()
  @Column({ length: 255, nullable: true })
  mana_cost!: string;

  @Field()
  @Column({ type: "float", nullable: true })
  cmc!: number;

  @Field()
  @Column({ length: 255, nullable: true })
  type_line!: string;

  @Field(() => [String], { nullable: true })
  @Column({ type: "simple-array", nullable: true })
  colors!: string[];

  @Field(() => [String])
  @Column({ type: "simple-array", nullable: true })
  color_identity!: string[];

  @Field(() => [String])
  @Column({ type: "simple-array", nullable: true })
  produced_mana!: string[];

  @Field()
  @Column({ length: 255, nullable: true })
  set!: string;

  @Field()
  @Column({ length: 255, nullable: true })
  set_name!: string;

  @Field()
  @Column({ length: 255, nullable: true })
  rarity!: string;

  @Field()
  @Column({ length: 255, nullable: true })
  border_color!: string;

  @Field(() => CardPrice)
  @OneToOne(() => CardPrice, { cascade: true, eager: true })
  @JoinColumn()
  prices!: CardPrice;

  @Field(() => [CardStack])
  @OneToMany(() => CardStack, (cardStack) => cardStack.card)
  cardStacks!: CardStack[];
}

@ObjectType()
export class set {
  @Field()
  name!: string;
  @Field()
  value!: string;
}
