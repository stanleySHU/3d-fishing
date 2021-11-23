import { AtlasImage, IAtlasImage } from '../components/pixi/AtlasImage';

const Multip = 1;

export const IMG_2D_BG = `img_2d_bg`;
export const IMG_2D_BG_URL = `/assets/img/2d/bg.jpg`;

export const ATLAS_AVATARS = `atlas_avatars`;
export const ATLAS_AVATARS_URL = `/assets/img/Avatars@${Multip}x.json`;

export const ATLAS_COINS = `atlas_coins`;
export const ATLAS_COINS_URL = `/assets/img/coins@${Multip}x.json`;

export const ATLAS_FLAGS = `atlas_flags`;
export const ATLAS_FLAGS_URL = `/assets/img/flags@${Multip}x.json`;

export const ATLAS_COMPONENTS = `atlas_components`;
export const ATLAS_COMPONENTS_URL = `/assets/img/components@${Multip}x.json`;

export const ATLAS_GAMES = `atlas_games`;
export const ATLAS_GAMES_URL = `/assets/img/games@${Multip}x.json`;

export const AtlasComponents = (props: IAtlasImage) => {
    return <AtlasImage {...props} atlas={ATLAS_COMPONENTS}/>
}

export const AtlasGames = (props: IAtlasImage) => {
    return <AtlasImage {...props} atlas={ATLAS_GAMES}/>
}