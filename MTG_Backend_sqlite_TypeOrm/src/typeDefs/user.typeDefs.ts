import { InputType, ObjectType } from "type-graphql";

import { Field } from "type-graphql";
import { User } from "../entities/user.entity";

@ObjectType()
export class UserUpdateResponse {
  @Field(() => User)
  user!: User;

  @Field()
  success!: boolean;

  @Field()
  message!: string;
}

@InputType()
export class UserInput {
  @Field({ nullable: true })
  username!: string;

  @Field({ nullable: true })
  email!: string;

  @Field({ nullable: true })
  password!: string;
}
