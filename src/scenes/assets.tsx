import { AtlasImage, IAtlasImage } from '../components/babylonjs/AtlasImage';

const Multip = 1;

//
export const IMG_2D_BG = `img_2d_bg`;
export const IMG_2D_BG_URL = `/assets/img/2d/bg.jpg`;

export const ATLAS_AVATARS_IMG = `atlas_avatars_img`;
export const ATLAS_AVATARS_DATA = `atlas_avatars_data`;
export const ATLAS_AVATARS_IMG_URL = `/assets/img/Avatars@${Multip}x.jpg`;
export const ATLAS_AVATARS_DATA_URL = `/assets/img/Avatars@${Multip}x.json`;

export const ATLAS_COINS_IMG = `atlas_coins_img`;
export const ATLAS_COINS_DATA = `atlas_coins_data`;
export const ATLAS_COINS_IMG_URL = `/assets/img/coins@${Multip}x.png`;
export const ATLAS_COINS_DATA_URL = `/assets/img/coins@${Multip}x.json`;

export const ATLAS_FLAGS_IMG = `atlas_flags_img`;
export const ATLAS_FLAGS_DATA = `atlas_flags_data`;
export const ATLAS_FLAGS_IMG_URL = `/assets/img/flags@${Multip}x.png`;
export const ATLAS_FLAGS_DATA_URL = `/assets/img/flags@${Multip}x.json`;

export const ATLAS_COMPONENTS_IMG = `atlas_components_img`;
export const ATLAS_COMPONENTS_DATA = `atlas_components_data`;
export const ATLAS_COMPONENTS_IMG_URL = `/assets/img/components@${Multip}x.png`;
export const ATLAS_COMPONENTS_DATA_URL = `/assets/img/components@${Multip}x.json`;

export const ATLAS_GAMES_IMG = `atlas_games_img`;
export const ATLAS_GAMES_DATA = `atlas_games_data`;
export const ATLAS_GAMES_IMG_URL = `/assets/img/games@${Multip}x.png`;
export const ATLAS_GAMES_DATA_URL = `/assets/img/games@${Multip}x.json`;

//
export const IMG_3D_BG = `img_3d_bg`;
export const IMG_3D_BG_URL = `/assets/img/TableBg.jpg`;

export const ImageLobbyBg = () => {
    return <babylon-image url={IMG_2D_BG_URL} />
}

export const AtlasComponents = (props: IAtlasImage) => {
    return <AtlasImage {...props} atlas={ATLAS_COMPONENTS_DATA} url={ATLAS_COMPONENTS_IMG_URL}/>;
}

export const AtlasGames = (props: IAtlasImage) => {
    return <AtlasImage {...props} atlas={ATLAS_GAMES_DATA} url={ATLAS_GAMES_IMG_URL} />
}

export const AtlasCoins= (props: IAtlasImage) => {
    return <AtlasImage {...props} atlas={ATLAS_COINS_DATA} url={ATLAS_COINS_IMG_URL}/>;
}

export const AtlasFlags = (props: IAtlasImage) => {
    return <AtlasImage {...props} atlas={ATLAS_FLAGS_DATA} url={ATLAS_FLAGS_IMG_URL}/>;
}

export const AtlasAvatars = (props: IAtlasImage) => {
    return <AtlasImage {...props} atlas={ATLAS_AVATARS_DATA} url={ATLAS_AVATARS_IMG_URL}/>;
}