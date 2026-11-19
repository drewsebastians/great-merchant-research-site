import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { createInitialState, ROUTES } from "../game/data.mjs";
import { validateGameContent } from "../game/validation.mjs";

const gameRoot = fileURLToPath(new URL("../game/", import.meta.url));
const assetPaths = [
  ...ROUTES.map((route) => route.scene),
  ...ROUTES.flatMap((route) => route.enemies.map((enemy) => enemy.portrait)),
  ...createInitialState().party.map((unit) => unit.portrait),
  "assets/scout.svg"
];
const missingAssets = assetPaths.filter((assetPath) => !existsSync(gameRoot + assetPath));
const errors = validateGameContent();
for (const assetPath of missingAssets) errors.push("Missing game asset '" + assetPath + "'.");

if (errors.length) {
  console.error("Game content validation failed:\n- " + errors.join("\n- "));
  process.exitCode = 1;
} else {
  console.log("Game catalogs and " + assetPaths.length + " scene/portrait paths are valid.");
}
