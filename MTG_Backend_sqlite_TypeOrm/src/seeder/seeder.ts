import { dataSource } from "../config/db";
import { cardsSeeder } from "./cards.seeder";
import { setSeeder } from "./sets.seeder";

async function runSeeders() {
  try {
    if (!dataSource.isInitialized) {
      await dataSource.initialize();
    }

    const manager = dataSource.manager;

    await manager.query(
      `TRUNCATE TABLE set, "deck", card_stack, card_price, card_image_uris, card RESTART IDENTITY CASCADE`
    );

    await cardsSeeder(manager);
    await setSeeder(manager);

    console.log("✅ All seeders executed successfully");
  } catch (e) {
    console.error("Seeder failed:", e);
  } finally {
    await dataSource.destroy();
  }
}

runSeeders();
