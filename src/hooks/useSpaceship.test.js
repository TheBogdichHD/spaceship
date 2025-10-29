import { describe, it, expect, beforeEach, vi } from "vitest";
import { renderHook, act, waitFor } from "@testing-library/react";
import { useSpaceship } from "./useSpaceship";
import spaceService from "../services/spaceService";

vi.mock("../services/spaceService", () => ({
  default: {
    scan: vi.fn(),
  },
}));

describe("useSpaceship hook", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    spaceService.scan.mockResolvedValue({
      status: "success",
      items: [],
      damage: 0,
    });
  });

  it("should initialize with default values", async () => {
    const { result } = renderHook(() => useSpaceship());

    await waitFor(() => {
      expect(result.current.position).toEqual({ x: 400, y: 300 });
      expect(result.current.fuel).toBe(100);
      expect(result.current.hull).toBe(100);
      expect(result.current.connectionStatus).toBe("connected");
    });
  });

  it("should scan area on mount", async () => {
    renderHook(() => useSpaceship());

    await waitFor(() => {
      expect(spaceService.scan).toHaveBeenCalledWith(400, 300);
    });
  });

  it("should move ship and consume fuel", async () => {
    const { result } = renderHook(() => useSpaceship());

    await waitFor(() => {
      expect(result.current.connectionStatus).toBe("connected");
    });

    await act(async () => {
      await result.current.move("right");
    });

    expect(result.current.position).toEqual({ x: 410, y: 300 });
    expect(result.current.fuel).toBe(99);
  });

  it("should apply damage from scan", async () => {
    spaceService.scan.mockResolvedValue({
      status: "success",
      items: [],
      damage: 10,
    });

    const { result } = renderHook(() => useSpaceship());

    await waitFor(() => {
      expect(result.current.connectionStatus).toBe("connected");
    });

    await act(async () => {
      await result.current.move("up");
    });

    expect(result.current.hull).toBe(90);
  });

  it("should collect fuel barrels within radius", async () => {
    spaceService.scan.mockResolvedValue({
      status: "success",
      items: [{ x: 400, y: 300, type: "fuel" }],
      damage: 0,
    });

    const { result } = renderHook(() => useSpaceship());

    await waitFor(() => {
      expect(result.current.connectionStatus).toBe("connected");
    });

    await act(async () => {
      await result.current.move("up");
    });

    expect(result.current.fuel).toBe(100);
  });

  it("should not move when out of fuel", async () => {
    const { result } = renderHook(() => useSpaceship({ fuel: 0 }));

    await waitFor(() => {
      expect(result.current.connectionStatus).toBe("connected");
    });

    const initialPosition = { ...result.current.position };

    await act(async () => {
      await result.current.move("up");
    });

    expect(result.current.errorMessage).toBe("Not enough fuel!");
    expect(result.current.position).toEqual(initialPosition);
  });

  it("should handle connection errors", async () => {
    spaceService.scan.mockRejectedValue(
      new Error("No connection to Enterprise!")
    );

    const { result } = renderHook(() => useSpaceship());

    await waitFor(() => {
      expect(result.current.connectionStatus).toBe("error");
      expect(result.current.errorMessage).toContain(
        "No connection to Enterprise!"
      );
    });
  });

  it("should not move on connection error", async () => {
    const { result } = renderHook(() => useSpaceship());

    await waitFor(() => {
      expect(result.current.connectionStatus).toBe("connected");
    });

    spaceService.scan.mockRejectedValue(new Error("Connection failed"));

    const initialPosition = { ...result.current.position };

    await act(async () => {
      await result.current.move("left");
    });

    expect(result.current.position).toEqual(initialPosition);
    expect(result.current.connectionStatus).toBe("error");
  });

  it("should update items from scan", async () => {
    const mockItems = [
      { x: 400, y: 400, type: "asteroid" },
      { x: 420, y: 320, type: "spaceship", name: "SL-300" },
    ];

    spaceService.scan.mockResolvedValue({
      status: "success",
      items: mockItems,
      damage: 0,
    });

    const { result } = renderHook(() => useSpaceship());

    await waitFor(() => {
      expect(result.current.items).toEqual(mockItems);
    });
  });

  it("should allow manual scan", async () => {
    const { result } = renderHook(() => useSpaceship());

    await waitFor(() => {
      expect(result.current.connectionStatus).toBe("connected");
    });

    vi.clearAllMocks();

    await act(async () => {
      await result.current.scan();
    });

    expect(spaceService.scan).toHaveBeenCalledWith(400, 300);
  });
});
