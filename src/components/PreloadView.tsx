import { IPreloadViewProps } from "../resourceManager/AssetManager";

export const PreloadView = (props: IPreloadViewProps) => {
    const { progress } = props;

    return <adtFullscreenUi name='' idealWidth={960} idealHeight={540}>
        <babylon-image url='/assets/img/2d/bg.jpg' />
        <container>
            <babylon-image url='/assets/img/2d/loadingframe.png' width="433px" height="41px" />
            <babylon-image url='/assets/img/2d/loadingfill.png' width="427px" height="26px" />
        </container>
        <textBlock text={`${Math.round(progress)}%`} />
    </adtFullscreenUi>
}