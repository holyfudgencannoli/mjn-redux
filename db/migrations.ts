// src/data/db/migrations.ts
import { SQLiteDatabase } from "expo-sqlite";
import create_first_tables from "./__migrations__/version_1_0_0/create-first-tables";

export const DATABASE_VERSION: number = 10000;
  

export async function migrateDbIfNeeded(db: SQLiteDatabase) {
	

  const { user_version } = await db.getFirstAsync<{ user_version: number }>(
    "PRAGMA user_version"
  ) ?? { user_version: 0 };

	

  if (user_version >= DATABASE_VERSION) return;

  // if (user_version < 10000) {
	// 	const result = await first_tables(
	// 			db, 
	// 			DATABASE_VERSION, 
	// 		)
	// 	if (DATABASE_VERSION === 10000) {
	// 		const [Version, Tables] = result
	// 		console.log("Database Version: ", Version)
	// 		console.log("Tables: ", Tables)
	// 	} else {
	// 		console.log(result)
	// 	}
  // }

	// if (DATABASE_VERSION <= 10001) {
	// 	const result = await addUsageToRecipeBatches(
	// 		db,
	// 		DATABASE_VERSION,
	// 	)
	// 	if (DATABASE_VERSION === 10001) {
	// 		const [Version, Tables] = result
	// 		console.log("Database Version: ", Version)
	// 		console.log("Tables: ", Tables)
	// 	} else {
	// 		console.log(result)
	// 	}
	// }
	if (DATABASE_VERSION < 10000) {
		const result = await create_first_tables(
			db,
			DATABASE_VERSION,
		)
			const [Version, Tables] = result
			console.log("Database Version: ", Version)
			console.log("Tables: ", Tables)
	}


	// new tables here for immediate run; then move inside conditional
      
}
