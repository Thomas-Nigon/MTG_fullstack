import { Field, ID, InputType, Int, ObjectType } from "type-graphql";
import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from "typeorm";
import { Deck, DeckInput } from "./deck.typeDefs";
import { Card, CardInput } from "./cards.typeDefs";

@InputType()
export class CardStackInput {
  @Field() // ID of the Card being referenced
  cardId!: string;

  @Field(() => Int) // Quantity of the card in this stack
  quantity!: number;
}

@Entity()
@ObjectType()
export class CardStack extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: string;

  @Field(() => Card)
  @ManyToOne(() => Card, (card) => card.cardStacks, {
    cascade: true,
    eager: true,
  })
  card!: Card;

  @Column()
  quantity!: number;

  @Field(() => Deck)
  @ManyToOne(() => Deck, (deck) => deck.cardStacks)
  deck!: Deck;
}
