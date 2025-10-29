import { useSpaceship } from "./hooks/useSpaceship";
import { SpaceMap } from "./components/SpaceMap";
import { FuelGauge } from "./components/FuelGauge";
import { ConnectionStatus } from "./components/ConnectionStatus";
import { HullIntegrity } from "./components/HullIntegrity";
import { Controls } from "./components/Controls";

import "./styles/App.css";

function App() {
  const {
    position,
    fuel,
    hull,
    items,
    connectionStatus,
    isMoving,
    errorMessage,
    move,
    scan,
    canMove: canMoveShip,
    isDestroyed: shipDestroyed,
  } = useSpaceship();

  return (
    <div className="app-container">
      <header>
        <h1>🚀 SPACESHIP CONTROL INTERFACE</h1>
        <div className="subtitle">
          Status: {shipDestroyed ? "💥 DESTROYED" : "✓ OPERATIONAL"}
        </div>
      </header>

      <div className="main-layout">
        <div>
          <SpaceMap position={position} items={items} />
        </div>

        <div className="status-controls-column">
          <div className="status-grid">
            <FuelGauge fuel={fuel} />
            <ConnectionStatus
              status={connectionStatus}
              errorMessage={errorMessage}
            />
            <HullIntegrity hull={hull} />
            <Controls
              onMove={move}
              onScan={scan}
              disabled={!canMoveShip || shipDestroyed}
              isMoving={isMoving}
            />
          </div>

          <div className="legend">
            <h4>MAP LEGEND</h4>
            <div>
              <div>
                <span className="green-text">▲ Green Ship</span> - Your
                spacecraft
              </div>
              <div>
                <span className="gray-text">▲ Gray Ship</span> - Other
                spacecraft
              </div>
              <div>
                <span className="dark-gray-text">● Gray Circle</span> - Asteroid
              </div>
              <div>
                <span className="green-barrel-text">▮ Green Barrel</span> - Fuel
                (+20)
              </div>
              <div className="collection-radius">
                <strong>Collection Radius:</strong> 10 units (dashed circle)
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="system-info">
        <h4>SYSTEM INFORMATION</h4>
        <div className="info-grid">
          <div>
            <strong>Movement:</strong> 10 units per step
          </div>
          <div>
            <strong>Fuel Consumption:</strong> 1 per move
          </div>
          <div>
            <strong>Map Size:</strong> 800 x 600
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
