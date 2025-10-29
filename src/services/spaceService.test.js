import { describe, it, expect, beforeEach, vi } from "vitest";
import { locateAtPosition, spaceService } from "./spaceService";

global.fetch = vi.fn();

describe("Space Service", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("locateAtPosition", () => {
    it("should successfully fetch and return data", async () => {
      const mockData = {
        status: "success",
        items: [{ x: 100, y: 100, type: "asteroid" }],
        damage: 0,
      };

      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockData,
      });

      const result = await locateAtPosition(100, 100);

      expect(global.fetch).toHaveBeenCalledWith(
        "/api/space/locate?x=100&y=100"
      );
      expect(result).toEqual(mockData);
    });

    it("should handle HTTP errors (4XX, 5XX)", async () => {
      global.fetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
        statusText: "Internal Server Error",
      });

      await expect(locateAtPosition(100, 100)).rejects.toThrow(
        "HTTP Error: 500 Internal Server Error"
      );
    });

    it("should handle application-level failures", async () => {
      const mockData = {
        status: "failure",
        message: "No connection to Enterprise!",
      };

      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockData,
      });

      await expect(locateAtPosition(100, 100)).rejects.toThrow(
        "No connection to Enterprise!"
      );
    });

    it("should handle network errors", async () => {
      global.fetch.mockRejectedValueOnce(new Error("Network error"));

      await expect(locateAtPosition(100, 100)).rejects.toThrow(
        "Failed to locate: Network error"
      );
    });
  });

  describe("spaceService.scan", () => {
    it("should call locateAtPosition with correct coordinates", async () => {
      const mockData = {
        status: "success",
        items: [],
        damage: 0,
      };

      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockData,
      });

      const result = await spaceService.scan(200, 300);

      expect(global.fetch).toHaveBeenCalledWith(
        "/api/space/locate?x=200&y=300"
      );
      expect(result).toEqual(mockData);
    });
  });
});
