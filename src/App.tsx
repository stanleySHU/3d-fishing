import { Engine } from 'react-babylonjs';
import { NavController } from './scenes/NavController';
import { LobbyScene } from './scenes/LobbyScene';
import { GameScene } from './scenes/game/GameScene';
import { GamePreloadScene, StartUpScene } from './scenes/LoadingScene'
import { AppContextProvider } from './model/context/AppProvider';
import { Auth } from './components/Auth';

function App() {
  return (
    <AppContextProvider>
      <Auth />
      <Engine antialias adaptToDeviceRatio canvasId='Game' width={960} height={540}>
        <NavController enter="startUp">
          <StartUpScene id="startUp" />
          <LobbyScene id="lobby" />
          <GamePreloadScene id="gamePreload" next="game"/>
          <GameScene id="game" />
        </NavController>
      </Engine>
    </AppContextProvider>
  );
}

export default App;