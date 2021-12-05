import { AtlasImage, IAtlasImage } from '../components/pixi/AtlasImage';
import { UISpine, ISpineProps } from '../components/pixi/Spine';

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

export const ATLAS_BULLET = `atlas_bullet`;
export const ATLAS_BULLET_URL = `/assets/img/bullet@${Multip}x.json`;

export const ATLAS_CANNON_LV0 = `json_fishs_v0`;
export const JSON_CANNON_LV0_URL = `/assets/img/spine/lv1lv2.json`;
export const ATLAS_CANNON_LV0_URL = `/assets/img/spine/lv1lv2.atlas`;

export const ATLAS_CANNON_LV1 = `json_fishs_v1`;
export const JSON_CANNON_LV1_URL = `/assets/img/spine/lv3lv4.json`;
export const ATLAS_CANNON_LV1_URL = `/assets/img/spine/lv3lv4.atlas`;

export const ATLAS_CANNON_LV2 = `json_fishs_v2`;
export const JSON_CANNON_LV2_URL = `/assets/img/spine/lv5lv6.json`;
export const ATLAS_CANNON_LV2_URL = `/assets/img/spine/lv5lv6.atlas`;

export const AtlasComponents = (props: IAtlasImage) => {
    return <AtlasImage {...props} atlas={ATLAS_COMPONENTS}/>
}

export const AtlasGames = (props: IAtlasImage) => {
    return <AtlasImage {...props} atlas={ATLAS_GAMES}/>
}

export type ICannonFresherAnimation = 'lv1cannon' | 'lv1cannon_fire' | 'lv2cannon' | 'lv2cannon_fire';
export type ICannonAdvantedAnimation = 'lv3cannon' | 'lv3cannon_fire' | 'lv4cannon' | 'lv4cannon_fire';
export type ICannonMasterAnimation = 'lv5cannon' | 'lv5cannon_fire' | 'lv6cannon' | 'lv6cannon_fire' | 'lv6cannon_exit' | 'lv6cannon_open';
export type ICannonAnimation = ICannonFresherAnimation | ICannonAdvantedAnimation | ICannonMasterAnimation;
export const UICannonFresher = (props: ISpineProps & {action: ICannonFresherAnimation}) => {
    const { action } = props;
    return <UISpine {...props} atlas={ATLAS_CANNON_LV0} animation={action}/>
}

export const UICannonAdvanted= (props: ISpineProps & {action: ICannonAdvantedAnimation}) => {
    const { action } = props;
    return <UISpine {...props} atlas={ATLAS_CANNON_LV1} animation={action}/>
}

export const UICannonMaster = (props: ISpineProps & {action: ICannonMasterAnimation}) => {
    const { action } = props;
    return <UISpine {...props} atlas={ATLAS_CANNON_LV2} animation={action}/>
}