import { ITEMS, RECIPES, ROUTE_LINKS, ROUTES } from "./data.mjs";

function uniqueIds(entries, label, errors) {
  const seen = new Set();
  for (const entry of entries) {
    if (typeof entry.id !== "string" || !entry.id.trim()) {
      errors.push(label + " has an entry with an empty ID.");
    } else if (seen.has(entry.id)) {
      errors.push(label + " contains duplicate ID '" + entry.id + "'.");
    }
    seen.add(entry.id);
  }
  return new Set(entries.map((entry) => entry.id));
}

function isNonnegativeInteger(value) {
  return Number.isSafeInteger(value) && value >= 0;
}

export function validateGameContent({ items = ITEMS, routes = ROUTES, recipes = RECIPES, routeLinks = ROUTE_LINKS } = {}) {
  const errors = [];
  const itemIds = uniqueIds(items, "Items", errors);
  const routeIds = uniqueIds(routes, "Routes", errors);
  uniqueIds(recipes, "Recipes", errors);

  for (const item of items) {
    if (!item.name || !item.kind) errors.push("Item '" + item.id + "' needs a name and kind.");
    for (const priceKey of ["buyPrice", "sellPrice"]) {
      const price = item[priceKey];
      if (price !== null && !isNonnegativeInteger(price)) errors.push("Item '" + item.id + "' has an invalid " + priceKey + ".");
    }
  }

  const prerequisites = new Map();
  for (const route of routes) {
    if (!route.name || !route.title) errors.push("Route '" + route.id + "' needs a name and title.");
    if (!route.mapPosition || !["x", "y"].every((axis) => Number.isFinite(route.mapPosition[axis]) && route.mapPosition[axis] >= 0 && route.mapPosition[axis] <= 100)) {
      errors.push("Route '" + route.id + "' needs map coordinates from 0 to 100.");
    }
    if (typeof route.scene !== "string" || !route.scene.trim()) errors.push("Route '" + route.id + "' needs a scene asset path.");
    if (route.requiresRoute) {
      if (!routeIds.has(route.requiresRoute)) errors.push("Route '" + route.id + "' requires unknown route '" + route.requiresRoute + "'.");
      if (route.requiresRoute === route.id) errors.push("Route '" + route.id + "' cannot require itself.");
      prerequisites.set(route.id, route.requiresRoute);
    }
    if (!route.reward || !isNonnegativeInteger(route.reward.coin) || !isNonnegativeInteger(route.reward.reputation)) {
      errors.push("Route '" + route.id + "' has invalid coin or reputation rewards.");
    }
    for (const [itemId, quantity] of Object.entries(route.reward?.items || {})) {
      if (!itemIds.has(itemId)) errors.push("Route '" + route.id + "' rewards unknown item '" + itemId + "'.");
      if (!Number.isSafeInteger(quantity) || quantity < 1) errors.push("Route '" + route.id + "' has an invalid quantity for '" + itemId + "'.");
    }
    if (!Array.isArray(route.enemies) || route.enemies.length < 1) errors.push("Route '" + route.id + "' needs at least one encounter enemy.");
    else {
      const enemyIds = new Set();
      for (const enemy of route.enemies) {
        if (!enemy.id || enemyIds.has(enemy.id)) errors.push("Route '" + route.id + "' has an empty or duplicate enemy ID.");
        enemyIds.add(enemy.id);
        if (!Number.isSafeInteger(enemy.hp) || enemy.hp < 1 || !Number.isSafeInteger(enemy.damage) || enemy.damage < 1) {
          errors.push("Enemy '" + enemy.id + "' on route '" + route.id + "' needs positive HP and damage.");
        }
        if (typeof enemy.portrait !== "string" || !enemy.portrait.trim()) errors.push("Enemy '" + enemy.id + "' on route '" + route.id + "' needs a portrait asset path.");
      }
    }
  }

  for (const route of routes) {
    const visited = new Set([route.id]);
    let prerequisite = prerequisites.get(route.id);
    while (prerequisite && routeIds.has(prerequisite)) {
      if (visited.has(prerequisite)) {
        errors.push("Route unlock prerequisites contain a cycle through '" + prerequisite + "'.");
        break;
      }
      visited.add(prerequisite);
      prerequisite = prerequisites.get(prerequisite);
    }
  }

  for (const recipe of recipes) {
    const output = items.find((item) => item.id === recipe.output?.itemId);
    if (!output) errors.push("Recipe '" + recipe.id + "' outputs unknown item '" + recipe.output?.itemId + "'.");
    else if (output.kind !== "trade" || output.sellPrice === null) errors.push("Recipe '" + recipe.id + "' output must be a sellable trade item.");
    if (!Number.isSafeInteger(recipe.output?.quantity) || recipe.output.quantity < 1) errors.push("Recipe '" + recipe.id + "' has an invalid output quantity.");
    const inputUnits = Object.values(recipe.inputs || {}).reduce((sum, quantity) => sum + (Number.isSafeInteger(quantity) && quantity > 0 ? quantity : 0), 0);
    for (const [itemId, quantity] of Object.entries(recipe.inputs || {})) {
      if (!itemIds.has(itemId)) errors.push("Recipe '" + recipe.id + "' needs unknown item '" + itemId + "'.");
      if (!Number.isSafeInteger(quantity) || quantity < 1) errors.push("Recipe '" + recipe.id + "' has an invalid quantity for '" + itemId + "'.");
      if (itemId === recipe.output?.itemId) errors.push("Recipe '" + recipe.id + "' cannot consume its own output.");
    }
    if (Number.isSafeInteger(recipe.output?.quantity) && recipe.output.quantity !== inputUnits) {
      errors.push("Recipe '" + recipe.id + "' must conserve tracked item count between inputs and output.");
    }
  }

  const seenLinks = new Set();
  for (const link of routeLinks) {
    if (!routeIds.has(link.from)) errors.push("Route connection starts at unknown route '" + link.from + "'.");
    if (!routeIds.has(link.to)) errors.push("Route connection ends at unknown route '" + link.to + "'.");
    if (link.from === link.to) errors.push("Route connection cannot link a route to itself.");
    if (!link.label) errors.push("Route connection '" + link.from + " → " + link.to + "' needs a label.");
    const key = [link.from, link.to].sort().join("::");
    if (seenLinks.has(key)) errors.push("Route connection '" + key + "' is duplicated.");
    seenLinks.add(key);
  }

  return errors;
}
