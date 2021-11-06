import { AtlasImage, IAtlasImage } from '../components/AtlasImage';


export const ATLAS_BG_IMG = 'atlas_bg';
export const ATLAS_BG_IMG_URL = '/assets/img/2d/bg.jpg';

export const ATLAS_AVATARS_IMG = 'atlas_avatars_img';
export const ATLAS_AVATARS_DATA = 'atlas_avatars_data';
export const ATLAS_AVATARS_IMG_URL = '/assets/img/Avatars@2x.jpg';
export const ATLAS_AVATARS_DATA_URL = '/assets/img/Avatars@2x.json';

export const ATLAS_COINS_IMG = 'atlas_coins_img';
export const ATLAS_COINS_DATA = 'atlas_coins_data';
export const ATLAS_COINS_IMG_URL = '/assets/img/coins@2x.png';
export const ATLAS_COINS_DATA_URL = '/assets/img/coins@2x.json';

export const ATLAS_FLAGS_IMG = 'atlas_flags_img';
export const ATLAS_FLAGS_DATA = 'atlas_flags_data';
export const ATLAS_FLAGS_IMG_URL = '/assets/img/flags@2x.png';
export const ATLAS_FLAGS_DATA_URL = '/assets/img/flags@2x.json';

export const ATLAS_COMPONENTS_IMG = 'atlas_components_img';
export const ATLAS_COMPONENTS_DATA = 'atlas_components_data';
export const ATLAS_COMPONENTS_IMG_URL = '/assets/img/components@2x.png';
export const ATLAS_COMPONENTS_DATA_URL = '/assets/img/components@2x.json';

export const ImageBg = () => {
    return <babylon-image url={ATLAS_BG_IMG_URL} />
}

export const AtlasComponents = (props: IAtlasImage) => {
    return <AtlasImage {...props} atlas={ATLAS_COMPONENTS_DATA} url={ATLAS_COMPONENTS_IMG_URL}/>;
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