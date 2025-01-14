import { Field, ID, InputType, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./user.typeDefs";
import { CardStack, CardStackInput } from "./cardStack.typeDefs";

@InputType()
export class DeckInput extends BaseEntity {
  @Field()
  name!: string;

  @Field()
  description!: string;

  @Field()
  img_url!: string;

  @Field()
  ownerId!: string;

  @Field(() => [CardStackInput])
  cardStacks!: CardStackInput[];
}

@Entity()
@ObjectType()
export class Deck extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: string;

  @Field()
  @Column({ length: 255 })
  name!: string;

  @Field()
  @Column({ length: 255 })
  description!: string;

  @Field()
  @Column({ length: 255, default: "https://via.placeholder.com/150" })
  img_url!: string;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.decks)
  ownerId!: string;

  @Field(() => [CardStack])
  @OneToMany(() => CardStack, (cardStack) => cardStack.deck, { cascade: true })
  cardStacks!: CardStack[];
}
