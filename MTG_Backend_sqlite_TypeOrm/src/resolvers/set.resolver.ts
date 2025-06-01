import { Arg, Query, Resolver } from "type-graphql";
import { Set } from "../entities/set.entity";
import { ParentSetGroup } from "../typeDefs/parentSetGroup.typDefs";

type ParentSetWithChildren = {
  parentCode: string;
  parent: Set | null;
  children: [Set] | null;
};

@Resolver(Set)
export class SetResolver {
  @Query(() => [Set])
  async getSets(): Promise<Set[]> {
    const sets = await Set.find({ order: { released_at: "DESC" } });
    if (!sets) throw new Error("No sets found");
    return sets;
  }

  @Query(() => Set)
  async getSetByName(@Arg("name") name: string) {
    try {
      const set = await Set.findOneOrFail({
        where: { name },
      });
      return set;
    } catch (error) {
      throw new Error(`Error get set with name:${name}. Error: ${error}`);
    }
  }

  @Query(() => [ParentSetGroup])
  async groupedSets(): Promise<ParentSetWithChildren[]> {
    const allSets = await Set.find();

    const groupsMap = new Map<string, ParentSetWithChildren>();

    for (const set of allSets) {
      if (set.parent_set_code) {
        const group = groupsMap.get(set.parent_set_code) ?? {
          parentCode: set.parent_set_code,
          parent: null,
          children: [set],
        };
        group.children?.push(set);
        groupsMap.set(set.parent_set_code, group);
      } else {
        const group = groupsMap.get(set.code) ?? {
          parentCode: set.code,
          parent: set,
          children: [set],
        };
        group.parent = set;
        groupsMap.set(set.code, group);
      }
    }

    return Array.from(groupsMap.values()).filter(
      (g) => g.children && g.children.length > 0
    );
  }
}
