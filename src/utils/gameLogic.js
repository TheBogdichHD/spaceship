const MOVE_DISTANCE = 10;
const FUEL_COLLECTION_RADIUS = 10;

export const CONSTANTS = {
  MOVE_DISTANCE,
  FUEL_COLLECTION_RADIUS,
  MAX_FUEL: 100,
  MAX_HULL: 100,
  FUEL_PER_BARREL: 20,
  FUEL_PER_MOVE: 1,
};

export function calculateDistance(x1, y1, x2, y2) {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

export function isWithinCollectionRadius(
  shipX,
  shipY,
  itemX,
  itemY,
  radius = FUEL_COLLECTION_RADIUS
) {
  return calculateDistance(shipX, shipY, itemX, itemY) <= radius;
}

export function collectibleFuelBarrels(shipX, shipY, items) {
  return items.filter(
    (item) =>
      item.type === "fuel" &&
      isWithinCollectionRadius(shipX, shipY, item.x, item.y)
  );
}

export function calculateNewPosition(currentX, currentY, direction) {
  const moves = {
    up: { x: 0, y: -MOVE_DISTANCE },
    down: { x: 0, y: MOVE_DISTANCE },
    left: { x: -MOVE_DISTANCE, y: 0 },
    right: { x: MOVE_DISTANCE, y: 0 },
  };

  const move = moves[direction];
  if (!move) return { x: currentX, y: currentY };

  return {
    x: Math.max(0, Math.min(800, currentX + move.x)),
    y: Math.max(0, Math.min(600, currentY + move.y)),
  };
}

export function applyDamage(currentHull, damage) {
  return Math.max(0, currentHull - damage);
}

export function consumeFuel(currentFuel, amount = 1) {
  return Math.max(0, currentFuel - amount);
}

export function addFuel(currentFuel, amount, maxCapacity = 100) {
  return Math.min(maxCapacity, currentFuel + amount);
}

export function canMove(fuel) {
  return fuel > 0;
}

export function isDestroyed(hull) {
  return hull <= 0;
}
