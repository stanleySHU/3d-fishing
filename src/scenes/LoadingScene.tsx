import { AssetManagerContext } from 'react-babylonjs';

export type IPreloadProps = {

}

export const PreloadView = (props: IPreloadProps) => {
    return <AssetManagerContext.Consumer>
        {
            ({lastProgress}) => {
                return <advancedDynamicTexture name='loading' width={960} height={540} idealWidth={960} idealHeight={540}>
                <babylon-image url='/assets/img/2d/bg.jpg'/>
            </advancedDynamicTexture>
            }
        }
    </AssetManagerContext.Consumer>
    
};

export const LobbyLoading = () => {
    
    return <PreloadView/>
}