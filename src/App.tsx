import { Engine as ReactBabylonjsEngine } from 'react-babylonjs';
import { AppContextProvider } from './model/context/AppProvider';
import { Auth } from './components/Auth';
import { useRef } from 'react';
import { PIXIApp } from './PIXIApp';
import { NavController } from './scenes/NavController';
import { LobbyScene } from './scenes1/LobbyScene';
import { StartUpScene, GamePreloadScene } from './scenes1/LoadingScene';
import { Observable } from '@babylonjs/core';
import { GameScene } from './scenes1/game/GameScene';

function App() {
  const engineRef = useRef<Engine>();
  return (
    <AppContextProvider>
      <Auth />
      <Engine ref={engineRef} antialias adaptToDeviceRatio canvasId='Game' width={960} height={540}>
        <PIXIApp reactBablonjsEngineRef={engineRef}>
          <NavController enter="startUp">
            <StartUpScene id="startUp" next="lobby"/>
            <LobbyScene id="lobby" />
            <GamePreloadScene id="gamePreload" next="game"/>
            <GameScene id="game"/>
            {/* <StartUpScene id="startUp" />
            <LobbyScene id="lobby" />
            <GamePreloadScene id="gamePreload" next="game" />
            <GameScene id="game" /> */}
          </NavController>
        </PIXIApp>
      </Engine>
    </AppContextProvider>
  );
}

export class Engine extends ReactBabylonjsEngine {
  onAfterEngineResizeObservable: Observable<Engine> = new Observable<Engine>();

  onResizeWindow = () => {
    const that = this as any;
    if (that.engine) {
      that.engine.resize()
      if (that.onAfterEngineResizeObservable.hasObservers()) {
        that.onAfterEngineResizeObservable.notifyObservers(that.engine!)
      }
    }
  }
}

export default App;