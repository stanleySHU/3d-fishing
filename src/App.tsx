import { Engine } from 'react-babylonjs';
import { NavController } from './scenes/NavController';
import { LobbyScene } from './scenes/LobbyScene';
import { GameScene } from './scenes/GameScene';
import { StartUpScene } from './scenes/StartUpScene'
import { AppContextProvider } from './model/data/AppProvider';
import { Auth } from './components/Auth';

function App() {
  return (
    <AppContextProvider>
      <Auth/>
      <Engine antialias adaptToDeviceRatio canvasId='Game' width={960} height={540}>
        <NavController enter="startUp">
          <StartUpScene id="startUp"/>
          <LobbyScene id="lobby"/>
          <GameScene id="game"/>
        </NavController>
      </Engine>
    </AppContextProvider>
  );
}

export default App;