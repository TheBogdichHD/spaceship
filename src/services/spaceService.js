const BASE_URL = "/api/space";

async function handleResponse(response) {
  if (!response.ok) {
    throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();

  if (data.status === "failure") {
    throw new Error(data.message || "Unknown error from base");
  }

  return data;
}

/**
 * Locate objects at specified coordinates
 * @param {number} x - X coordinate
 * @param {number} y - Y coordinate
 * @returns {Promise<{status: string, items: Array, damage: number}>}
 */
export async function locateAtPosition(x, y) {
  try {
    const response = await fetch(`${BASE_URL}/locate?x=${x}&y=${y}`);
    return await handleResponse(response);
  } catch (error) {
    throw new Error(`Failed to locate: ${error.message}`);
  }
}

export const spaceService = {
  async scan(x, y) {
    return locateAtPosition(x, y);
  },
};

export default spaceService;
