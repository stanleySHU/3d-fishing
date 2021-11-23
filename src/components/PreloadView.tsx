import { Container, Sprite, Text } from "@inlet/react-pixi";
import { Point } from "@pixi/math";

export type IPreloadViewProps = {
    progress: number
}

export const PreloadView3D = (props: IPreloadViewProps) => {
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

export const PreloadView2D = (props: IPreloadViewProps) => {
    const { progress } = props;
    return <Container>
        <Sprite image="/assets/img/2d/bg.jpg"/>
        <Container>
            <Sprite image="/assets/img/2d/loadingframe.png" x={265} y={378}/>
            <Sprite image="/assets/img/2d/loadingfill.png" x={274} y={384}/>
        </Container>
        <Text text={`${Math.round(progress)}%`} x={480} y={398} anchor={new Point(0.5, 0.5)} style={{fontSize: '17px', fill: '#fff'}}/>
    </Container>
}