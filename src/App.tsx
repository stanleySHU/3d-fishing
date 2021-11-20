import { Engine } from 'react-babylonjs';
import { AppContextProvider } from './model/context/AppProvider';
import { Auth } from './components/Auth';
import { Sprite, Renderer, Container as pixiContainer } from 'pixi.js';
import { useEffect, useRef } from 'react';
import { PIXIApp } from './PIXIApp';
import { NavController } from './scenes/NavController';
import { GamePreloadScene, StartUpScene } from './scenes/LoadingScene';
import { LobbyScene } from './scenes/LobbyScene';
import { GameScene } from './scenes/game/GameScene';

function App() {
  const engineRef = useRef<Engine>();
  return (
    <AppContextProvider>
      <Auth />
      <Engine ref={engineRef} antialias adaptToDeviceRatio canvasId='Game' width={960} height={540}>
        <PIXIApp reactBablonjsEngineRef={engineRef}/>
        {/* <NavController enter="startUp">
          <StartUpScene id="startUp" />
          <LobbyScene id="lobby" />
          <GamePreloadScene id="gamePreload" next="game" />
          <GameScene id="game" />
        </NavController> */}
      </Engine>
    </AppContextProvider>
  );
}

export default App;