import test from "node:test";
import assert from "node:assert/strict";
import { ITEMS, RECIPES, ROUTE_LINKS, ROUTES } from "../game/data.mjs";
import { validateGameContent } from "../game/validation.mjs";

test("the shipped item, route, recipe and map catalogs pass content validation", () => {
  assert.deepEqual(validateGameContent(), []);
});

test("content validation reports broken references and invalid quantities", () => {
  const routes = [{
    ...ROUTES[0],
    requiresRoute: "missing-route",
    mapPosition: { x: 120, y: -4 },
    reward: { coin: -1, reputation: 0, items: { "missing-item": 0 } }
  }];
  const recipes = [{
    ...RECIPES[0],
    inputs: { "missing-input": 0 },
    output: { itemId: "missing-output", quantity: 0 }
  }];
  const errors = validateGameContent({ items: ITEMS, routes, recipes, routeLinks: [{ from: "ghost", to: "ghost", label: "" }] });
  const message = errors.join("\n");
  assert.match(message, /requires unknown route/);
  assert.match(message, /map coordinates from 0 to 100/);
  assert.match(message, /invalid coin or reputation rewards/);
  assert.match(message, /rewards unknown item/);
  assert.match(message, /invalid quantity/);
  assert.match(message, /outputs unknown item/);
  assert.match(message, /Route connection starts at unknown route/);
  assert.match(message, /cannot link a route to itself/);
  assert.match(message, /needs a label/);
});

test("content validation detects duplicate IDs and route prerequisite cycles", () => {
  const duplicateItems = [...ITEMS, { ...ITEMS[0] }];
  const cyclicRoutes = ROUTES.map((route) => ({
    ...route,
    requiresRoute: route.id === "mosswind" ? "amber-quarry" : "mosswind"
  }));
  const errors = validateGameContent({ items: duplicateItems, routes: cyclicRoutes, recipes: RECIPES, routeLinks: ROUTE_LINKS });
  assert.ok(errors.some((error) => error.includes("duplicate ID 'ration'")));
  assert.ok(errors.some((error) => error.includes("prerequisites contain a cycle")));
});
