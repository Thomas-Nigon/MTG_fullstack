import { Field, ID, InputType, Int, ObjectType } from "type-graphql";
import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from "typeorm";
import { Deck } from "./deck.entity";
import { Card } from "./cards.entity";

@InputType()
export class CardStackInput {
  @Field()
  cardId!: string;

  @Field(() => Int)
  quantity!: number;
}

@Entity()
@ObjectType()
export class CardStack extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: string;

  @Field(() => Card)
  @ManyToOne(() => Card, (card) => card.cardStacks)
  card!: Card;

  @Column()
  quantity!: number;

  @Field(() => Deck)
  @ManyToOne(() => Deck, (deck) => deck.cardStacks)
  deck!: Deck;
}
