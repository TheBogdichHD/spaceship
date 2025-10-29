import { useState, useCallback, useEffect } from "react";
import spaceService from "../services/spaceService";
import {
  calculateNewPosition,
  applyDamage,
  consumeFuel,
  addFuel,
  canMove,
  isDestroyed,
  collectibleFuelBarrels,
  CONSTANTS,
} from "../utils/gameLogic";

export function useSpaceship(initialState = {}) {
  const [position, setPosition] = useState(
    initialState.position || { x: 400, y: 300 }
  );
  const [fuel, setFuel] = useState(
    initialState.fuel !== undefined ? initialState.fuel : 100
  );
  const [hull, setHull] = useState(
    initialState.hull !== undefined ? initialState.hull : 100
  );
  const [items, setItems] = useState([]);
  const [connectionStatus, setConnectionStatus] = useState("connected");
  const [isMoving, setIsMoving] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const scanArea = useCallback(async (x, y) => {
    try {
      setErrorMessage("");

      setConnectionStatus("scanning");
      const response = await spaceService.scan(x, y);

      setItems(response.items);
      setConnectionStatus("connected");

      return { success: true, damage: response.damage };
    } catch (error) {
      setConnectionStatus("error");
      setErrorMessage(error.message);
      return { success: false, damage: 0 };
    }
  }, []);

  const move = useCallback(
    async (direction) => {
      setErrorMessage("");

      if (!canMove(fuel)) {
        setErrorMessage("Not enough fuel!");
        return;
      }

      if (isDestroyed(hull)) {
        setErrorMessage("Ship is destroyed!");
        return;
      }

      if (isMoving) {
        return;
      }

      setIsMoving(true);

      const newPos = calculateNewPosition(position.x, position.y, direction);

      const scanResult = await scanArea(newPos.x, newPos.y);

      if (scanResult.success) {
        setPosition(newPos);

        setFuel((prev) => consumeFuel(prev, CONSTANTS.FUEL_PER_MOVE));

        if (scanResult.damage > 0) {
          setHull((prev) => applyDamage(prev, scanResult.damage));
        }

        const collectableFuel = collectibleFuelBarrels(
          newPos.x,
          newPos.y,
          scanResult.items || items
        );

        if (collectableFuel.length > 0) {
          const fuelGain = collectableFuel.length * CONSTANTS.FUEL_PER_BARREL;
          setFuel((prev) => addFuel(prev, fuelGain, CONSTANTS.MAX_FUEL));

          setItems((prev) =>
            prev.filter(
              (item) =>
                !collectableFuel.some(
                  (cf) => cf.x === item.x && cf.y === item.y
                )
            )
          );
        }
      }

      setIsMoving(false);
    },
    [position, fuel, hull, isMoving, items, scanArea]
  );

  const scan = useCallback(async () => {
    await scanArea(position.x, position.y);
  }, [position, scanArea]);

  useEffect(() => {
    scanArea(position.x, position.y);
  }, []);

  return {
    position,
    fuel,
    hull,
    items,
    connectionStatus,
    isMoving,
    errorMessage,

    move,
    scan,

    canMove: canMove(fuel),
    isDestroyed: isDestroyed(hull),
  };
}

export default useSpaceship;
