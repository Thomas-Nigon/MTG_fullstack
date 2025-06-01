import { ObjectType } from "type-graphql";
import { Set } from "../entities/set.entity";

import { Field } from "type-graphql";

@ObjectType()
export class ParentSetGroup {
  @Field()
  parentCode!: string;

  @Field(() => Set, { nullable: true })
  parent!: Set;

  @Field(() => [Set])
  children!: Set[];
}
