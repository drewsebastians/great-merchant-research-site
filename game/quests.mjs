import { QUESTS, findQuest } from "./data.mjs";

export function isQuestComplete(state, questId) {
  const quest = findQuest(questId);
  return Boolean(quest && quest.stages.length > 0 && quest.stages.every((stage) => isStageComplete(state, stage)));
}

export function isQuestUnlocked(state, questId) {
  const quest = findQuest(questId);
  return Boolean(quest && quest.requiresQuests.every((requiredId) => isQuestComplete(state, requiredId)));
}

export function getQuestEntryBlocker(state, questId) {
  const quest = findQuest(questId);
  if (!quest) return null;
  return quest.entryConditions.find((condition) => {
    if (condition.type === "crew-member") return !state.party.some((unit) => unit.id === condition.memberId);
    if (condition.type === "inventory-minimum") return (state.inventory[condition.itemId] || 0) < condition.quantity;
    return false;
  }) || null;
}

function isStageComplete(state, stage) {
  if (stage.type === "crew-member") return state.party.some((unit) => unit.id === stage.memberId);
  if (stage.type === "inventory-minimum") return (state.inventory[stage.itemId] || 0) >= stage.quantity;
  if (stage.type === "route-cleared") {
    return (state.completedRoutes || []).includes(stage.routeId) ||
      (state.activeRoute === stage.routeId && (state.phase === "victory" || (state.phase === "town" && state.routeCleared)));
  }
  if (stage.type === "returned-home") {
    return (state.completedRoutes || []).includes(stage.routeId) ||
      (state.phase === "town" && state.routeCleared && state.activeRoute === stage.routeId);
  }
  return false;
}

export function getQuestProgress(state, questId) {
  const quest = findQuest(questId);
  if (!quest) return null;
  const stages = quest.stages.map((stage) => ({ ...stage, complete: isStageComplete(state, stage) }));
  const completedCount = stages.filter((stage) => stage.complete).length;
  return {
    quest,
    stages,
    completedCount,
    totalStages: stages.length,
    complete: isQuestComplete(state, questId),
    currentStage: stages.find((stage) => !stage.complete) || null
  };
}

export function unlockedQuestIds(state) {
  return QUESTS.filter((quest) => isQuestUnlocked(state, quest.id)).map((quest) => quest.id);
}
