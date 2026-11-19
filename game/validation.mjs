import { ITEMS, QUESTS, RECIPES, ROUTE_LINKS, ROUTES } from "./data.mjs";

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

export function validateGameContent({ items = ITEMS, routes = ROUTES, quests = QUESTS, recipes = RECIPES, routeLinks = ROUTE_LINKS } = {}) {
  const errors = [];
  const itemIds = uniqueIds(items, "Items", errors);
  const routeIds = uniqueIds(routes, "Routes", errors);
  const questIds = uniqueIds(quests, "Quests", errors);
  uniqueIds(recipes, "Recipes", errors);

  for (const item of items) {
    if (!item.name || !item.kind) errors.push("Item '" + item.id + "' needs a name and kind.");
    for (const priceKey of ["buyPrice", "sellPrice"]) {
      const price = item[priceKey];
      if (price !== null && !isNonnegativeInteger(price)) errors.push("Item '" + item.id + "' has an invalid " + priceKey + ".");
    }
  }

  for (const route of routes) {
    if (!route.name || !route.title) errors.push("Route '" + route.id + "' needs a name and title.");
    if (!route.mapPosition || !["x", "y"].every((axis) => Number.isFinite(route.mapPosition[axis]) && route.mapPosition[axis] >= 0 && route.mapPosition[axis] <= 100)) {
      errors.push("Route '" + route.id + "' needs map coordinates from 0 to 100.");
    }
    if (typeof route.scene !== "string" || !route.scene.trim()) errors.push("Route '" + route.id + "' needs a scene asset path.");
    const quest = quests.find((entry) => entry.id === route.questId);
    if (!quest) errors.push("Route '" + route.id + "' references unknown quest '" + route.questId + "'.");
    else if (quest.routeId !== route.id) errors.push("Route '" + route.id + "' is linked to quest '" + quest.id + "' for another route.");
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

  const questPrerequisites = new Map();
  const questRouteOwners = new Map();
  for (const quest of quests) {
    if (!quest.title || !quest.summary) errors.push("Quest '" + quest.id + "' needs a title and summary.");
    if (!routeIds.has(quest.routeId)) errors.push("Quest '" + quest.id + "' references unknown route '" + quest.routeId + "'.");
    if (!routeIds.has(quest.rewardRouteId)) errors.push("Quest '" + quest.id + "' references unknown reward route '" + quest.rewardRouteId + "'.");
    if (quest.rewardRouteId !== quest.routeId) errors.push("Quest '" + quest.id + "' reward route must match its route.");
    if (questRouteOwners.has(quest.routeId)) errors.push("Route '" + quest.routeId + "' is assigned to more than one quest.");
    questRouteOwners.set(quest.routeId, quest.id);
    const route = routes.find((entry) => entry.id === quest.routeId);
    if (route && route.questId !== quest.id) errors.push("Quest '" + quest.id + "' is not linked from route '" + quest.routeId + "'.");
    if (!quest.rewards || !isNonnegativeInteger(quest.rewards.coin) || !isNonnegativeInteger(quest.rewards.reputation) || !quest.rewards.items || typeof quest.rewards.items !== "object" || Array.isArray(quest.rewards.items)) {
      errors.push("Quest '" + quest.id + "' needs valid coin, reputation and item rewards.");
    }
    if (quest.rewards?.items && typeof quest.rewards.items === "object" && !Array.isArray(quest.rewards.items)) {
      for (const [itemId, quantity] of Object.entries(quest.rewards.items)) {
        if (!itemIds.has(itemId)) errors.push("Quest '" + quest.id + "' rewards unknown item '" + itemId + "'.");
        if (!Number.isSafeInteger(quantity) || quantity < 1) errors.push("Quest '" + quest.id + "' has an invalid reward quantity for '" + itemId + "'.");
      }
    }
    if (!Array.isArray(quest.stages) || quest.stages.length < 1) errors.push("Quest '" + quest.id + "' needs at least one stage.");
    else {
      const stageIds = new Set();
      for (const stage of quest.stages) {
        if (!stage.id || stageIds.has(stage.id)) errors.push("Quest '" + quest.id + "' has an empty or duplicate stage ID.");
        stageIds.add(stage.id);
        if (!stage.label) errors.push("Quest stage '" + stage.id + "' needs a label.");
        if (stage.type === "crew-member" && !["mara", "scout"].includes(stage.memberId)) errors.push("Quest stage '" + stage.id + "' references an unknown crew member.");
        if (["route-cleared", "returned-home"].includes(stage.type) && !routeIds.has(stage.routeId)) errors.push("Quest stage '" + stage.id + "' references unknown route '" + stage.routeId + "'.");
        if (["route-cleared", "returned-home"].includes(stage.type) && stage.routeId !== quest.routeId) errors.push("Quest stage '" + stage.id + "' must use its quest route.");
        if (!["crew-member", "route-cleared", "returned-home", "inventory-minimum"].includes(stage.type)) errors.push("Quest stage '" + stage.id + "' has an unknown condition type.");
        if (stage.type === "inventory-minimum" && (!itemIds.has(stage.itemId) || !Number.isSafeInteger(stage.quantity) || stage.quantity < 1)) errors.push("Quest stage '" + stage.id + "' has an invalid inventory condition.");
      }
    }
    if (!Array.isArray(quest.entryConditions)) errors.push("Quest '" + quest.id + "' needs an entry condition list.");
    for (const condition of Array.isArray(quest.entryConditions) ? quest.entryConditions : []) {
      if (condition.type === "crew-member" && !["mara", "scout"].includes(condition.memberId)) errors.push("Quest '" + quest.id + "' entry condition references an unknown crew member.");
      if (condition.type === "inventory-minimum" && (!itemIds.has(condition.itemId) || !Number.isSafeInteger(condition.quantity) || condition.quantity < 1)) errors.push("Quest '" + quest.id + "' has an invalid entry inventory condition.");
      if (!["crew-member", "inventory-minimum"].includes(condition.type)) errors.push("Quest '" + quest.id + "' has an unknown entry condition type.");
    }
    const requires = Array.isArray(quest.requiresQuests) ? quest.requiresQuests : [];
    if (!Array.isArray(quest.requiresQuests)) errors.push("Quest '" + quest.id + "' needs a prerequisite list.");
    questPrerequisites.set(quest.id, requires);
    for (const requiredId of requires) {
      if (!questIds.has(requiredId)) errors.push("Quest '" + quest.id + "' requires unknown quest '" + requiredId + "'.");
      if (requiredId === quest.id) errors.push("Quest '" + quest.id + "' cannot require itself.");
      const prerequisite = quests.find((entry) => entry.id === requiredId);
      if (prerequisite && !(prerequisite.unlocks || []).includes(quest.id)) errors.push("Quest prerequisite '" + requiredId + "' is missing the matching unlock for '" + quest.id + "'.");
    }
    if (!Array.isArray(quest.unlocks)) errors.push("Quest '" + quest.id + "' needs an unlock list.");
    for (const unlockedId of Array.isArray(quest.unlocks) ? quest.unlocks : []) {
      const unlocked = quests.find((entry) => entry.id === unlockedId);
      if (!unlocked) errors.push("Quest '" + quest.id + "' unlocks unknown quest '" + unlockedId + "'.");
      else if (!(unlocked.requiresQuests || []).includes(quest.id)) errors.push("Quest unlock '" + quest.id + "' → '" + unlockedId + "' is missing the matching prerequisite.");
    }
  }

  const questVisitState = new Map();
  function visitQuest(questId) {
    const visitState = questVisitState.get(questId) || 0;
    if (visitState === 1) {
      errors.push("Quest unlock prerequisites contain a cycle through '" + questId + "'.");
      return;
    }
    if (visitState === 2) return;
    questVisitState.set(questId, 1);
    for (const prerequisite of questPrerequisites.get(questId) || []) {
      if (questIds.has(prerequisite)) visitQuest(prerequisite);
    }
    questVisitState.set(questId, 2);
  }
  for (const quest of quests) visitQuest(quest.id, []);

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
