import { Field, ID, InputType, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@InputType()
export class CardPriceInput {
  @Field()
  usd!: string;
  @Field()
  usd_foil!: string;

  /*   @Field()
  eur!: string;

  @Field()
  eur_foil!: string;

  @Field()
  tix!: string; */
}

@Entity()
@ObjectType()
export class CardPrice extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column({ length: 16, nullable: true })
  usd!: string;

  @Field()
  @Column({ length: 16, nullable: true })
  usd_foil!: string;

  /*  @Field()
  @Column({ length: 16, nullable: true })
  usd_etched!: string; */

  /*  @Field()
  @Column({ length: 16, nullable: true })
  eur!: string; */

  /*  @Field()
  @Column({ length: 16, nullable: true })
  eur_foil!: string; */

  /*  @Field()
  @Column({ length: 16, nullable: true })
  tix!: string; */
}
