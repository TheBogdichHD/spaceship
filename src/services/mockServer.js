import { createServer, Response } from "miragejs";
import { isWithinCollectionRadius } from "../utils/gameLogic";

let items = generateRandomItems(400, 300);

export function makeServer({ environment = "development" } = {}) {
  return createServer({
    environment,

    routes() {
      this.namespace = "api/space";

      this.get("/locate", (schema, request) => {
        const x = parseInt(request.queryParams.x);
        const y = parseInt(request.queryParams.y);

        if (Math.random() < 0.1) {
          return {
            status: "failure",
            message: "No connection to Enterprise!",
          };
        }

        if (Math.random() < 0.05) {
          return new Response(500, {}, { error: "Internal Server Error" });
        }

        //const items = generateRandomItems(x, y);
        items = deleteFuel(x, y, items);

        const damage = calculateDamage(x, y, items);

        return {
          status: "success",
          items,
          damage,
        };
      });

      this.passthrough();
    },
  });
}

function generateRandomItems(x, y) {
  const items = [];
  //const itemCount = Math.floor(Math.random() * 5) + 1;
  const itemCount = 200;

  const itemTypes = ["spaceship", "asteroid", "fuel"];
  const shipNames = ["SL-300", "Aurora-7", "Nebula-X", "Stardust-9"];

  for (let i = 0; i < itemCount; i++) {
    const type = itemTypes[Math.floor(Math.random() * itemTypes.length)];

    const offsetX = Math.floor(Math.random() * 800) - 400;
    const offsetY = Math.floor(Math.random() * 600) - 300;

    const item = {
      x: Math.max(0, Math.min(800, x + offsetX)),
      y: Math.max(0, Math.min(600, y + offsetY)),
      type,
    };

    if (type === "spaceship") {
      item.name = shipNames[Math.floor(Math.random() * shipNames.length)];
    }

    items.push(item);
  }

  return items;
}

function calculateDamage(x, y, items) {
  const nearbyAsteroids = items.filter((item) => {
    if (item.type !== "asteroid") return false;
    const distance = Math.sqrt(
      Math.pow(item.x - x, 2) + Math.pow(item.y - y, 2)
    );
    return distance < 20;
  });

  const damage = nearbyAsteroids.length * Math.floor(Math.random() * 10);

  return damage;
}

function deleteFuel(x, y, items) {
  console.log(items);
  return items.filter(
    (item) =>
      !(item.type === "fuel" && isWithinCollectionRadius(x, y, item.x, item.y))
  );
}

export default makeServer;
