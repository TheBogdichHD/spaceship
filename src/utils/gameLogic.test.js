import { describe, it, expect } from "vitest";
import {
  calculateDistance,
  isWithinCollectionRadius,
  collectibleFuelBarrels,
  calculateNewPosition,
  applyDamage,
  consumeFuel,
  addFuel,
  canMove,
  isDestroyed,
  CONSTANTS,
} from "./gameLogic";

describe("Game Logic Utils", () => {
  describe("calculateDistance", () => {
    it("should calculate distance between two points", () => {
      expect(calculateDistance(0, 0, 3, 4)).toBe(5);
      expect(calculateDistance(0, 0, 0, 0)).toBe(0);
      expect(calculateDistance(10, 10, 10, 20)).toBe(10);
    });
  });

  describe("isWithinCollectionRadius", () => {
    it("should return true if within radius", () => {
      expect(isWithinCollectionRadius(100, 100, 101, 101, 2)).toBe(true);
      expect(isWithinCollectionRadius(100, 100, 100, 100, 2)).toBe(true);
    });

    it("should return false if outside radius", () => {
      expect(isWithinCollectionRadius(100, 100, 105, 105, 2)).toBe(false);
    });
  });

  describe("collectibleFuelBarrels", () => {
    it("should filter fuel barrels within collection radius", () => {
      const items = [
        { x: 100, y: 100, type: "fuel" },
        { x: 200, y: 200, type: "fuel" },
        { x: 100, y: 101, type: "asteroid" },
      ];

      const result = collectibleFuelBarrels(100, 100, items);
      expect(result).toHaveLength(1);
      expect(result[0].x).toBe(100);
    });

    it("should return empty array if no fuel nearby", () => {
      const items = [
        { x: 200, y: 200, type: "fuel" },
        { x: 100, y: 101, type: "asteroid" },
      ];

      const result = collectibleFuelBarrels(100, 100, items);
      expect(result).toHaveLength(0);
    });
  });

  describe("calculateNewPosition", () => {
    it("should move up correctly", () => {
      const pos = calculateNewPosition(100, 100, "up");
      expect(pos).toEqual({ x: 100, y: 90 });
    });

    it("should move down correctly", () => {
      const pos = calculateNewPosition(100, 100, "down");
      expect(pos).toEqual({ x: 100, y: 110 });
    });

    it("should move left correctly", () => {
      const pos = calculateNewPosition(100, 100, "left");
      expect(pos).toEqual({ x: 90, y: 100 });
    });

    it("should move right correctly", () => {
      const pos = calculateNewPosition(100, 100, "right");
      expect(pos).toEqual({ x: 110, y: 100 });
    });

    it("should respect map boundaries", () => {
      const pos1 = calculateNewPosition(0, 0, "up");
      expect(pos1.y).toBeGreaterThanOrEqual(0);

      const pos2 = calculateNewPosition(800, 600, "down");
      expect(pos2.y).toBeLessThanOrEqual(600);
    });

    it("should return current position for invalid direction", () => {
      const pos = calculateNewPosition(100, 100, "invalid");
      expect(pos).toEqual({ x: 100, y: 100 });
    });
  });

  describe("applyDamage", () => {
    it("should reduce hull by damage amount", () => {
      expect(applyDamage(100, 10)).toBe(90);
      expect(applyDamage(50, 20)).toBe(30);
    });

    it("should not go below 0", () => {
      expect(applyDamage(10, 20)).toBe(0);
      expect(applyDamage(0, 10)).toBe(0);
    });
  });

  describe("consumeFuel", () => {
    it("should reduce fuel by specified amount", () => {
      expect(consumeFuel(100, 10)).toBe(90);
      expect(consumeFuel(50, 1)).toBe(49);
    });

    it("should not go below 0", () => {
      expect(consumeFuel(5, 10)).toBe(0);
      expect(consumeFuel(0, 1)).toBe(0);
    });
  });

  describe("addFuel", () => {
    it("should add fuel correctly", () => {
      expect(addFuel(50, 20, 100)).toBe(70);
      expect(addFuel(0, 50, 100)).toBe(50);
    });

    it("should not exceed max capacity", () => {
      expect(addFuel(90, 20, 100)).toBe(100);
      expect(addFuel(100, 10, 100)).toBe(100);
    });
  });

  describe("canMove", () => {
    it("should return true if fuel > 0", () => {
      expect(canMove(1)).toBe(true);
      expect(canMove(100)).toBe(true);
    });

    it("should return false if fuel = 0", () => {
      expect(canMove(0)).toBe(false);
    });
  });

  describe("isDestroyed", () => {
    it("should return true if hull <= 0", () => {
      expect(isDestroyed(0)).toBe(true);
      expect(isDestroyed(-10)).toBe(true);
    });

    it("should return false if hull > 0", () => {
      expect(isDestroyed(1)).toBe(false);
      expect(isDestroyed(100)).toBe(false);
    });
  });

  describe("CONSTANTS", () => {
    it("should have correct values", () => {
      expect(CONSTANTS.MOVE_DISTANCE).toBe(10);
      expect(CONSTANTS.FUEL_COLLECTION_RADIUS).toBe(10);
      expect(CONSTANTS.MAX_FUEL).toBe(100);
      expect(CONSTANTS.MAX_HULL).toBe(100);
    });
  });
});
