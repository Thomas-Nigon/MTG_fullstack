import { InputType, Field, Int, ObjectType } from "type-graphql";
import { Card } from "../entities/cards.entity";

@InputType()
export class PaginationInput {
  @Field(() => Int, { defaultValue: 1 }) // Default to the first page
  page!: number;

  @Field(() => Int, { defaultValue: 100 }) // Default page size is 10 items
  size!: number;
}

@ObjectType()
export class CardPaginationResponse {
  @Field(() => [Card])
  cards!: Card[];

  @Field(() => Int)
  totalCount!: number;

  @Field(() => Int)
  pageCount!: number;
}
