import { EntityManager } from "typeorm";
import { Set } from "../entities/set.entity";
import * as fs from "fs";

export const setSeeder = async (manager: EntityManager) => {
  try {
    const setJson = fs.readFileSync("./src/seeder/data/allSets.json", "utf-8");
    const setsArray = JSON.parse(setJson);
    for (const set of setsArray) {
      console.log(set);
      const newSet = new Set();
      newSet.code = set.code;
      newSet.mtgo_code = set.mtgo_code;
      newSet.arena_code = set.arena_code;
      newSet.tcgplayer_id = set.tcgplayer_id;
      newSet.name = set.name;
      newSet.uri = set.uri;
      newSet.scryfall_uri = set.scryfall_uri;
      newSet.search_uri = set.search_uri;
      newSet.released_at = set.released_at;
      newSet.set_type = set.set_type;
      newSet.card_count = set.card_count;
      newSet.printed_size = set.printed_size;
      newSet.digital = set.digital;
      newSet.nonfoil_only = set.nonfoil_only;
      newSet.foil_only = set.foil_only;
      newSet.block_code = set.block_code;
      newSet.block = set.block;
      newSet.icon_svg_uri = set.icon_svg_uri;
      newSet.parent_set_code = set.parent_set_code;

      await manager.save(newSet);
    }
  } catch (error) {
    console.error("Error seeding sets:", error);
  }
};
