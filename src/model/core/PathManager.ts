import { Scalar, Vector3 } from "@babylonjs/core";

export interface INextStatus {
    position: Vector3;
    direction: Vector3;
}

interface BasePath {
    lerp: (per: number) => INextStatus;
}

const SimplePath = (points: Vector3[]): BasePath =>{
    const [startPoint, endPoint] = points;
    return {
        lerp: (per: number) => {
            const status: INextStatus = {
                position: Vector3.Lerp(startPoint, endPoint, Scalar.Clamp(per, 0, 1)),
                direction: startPoint.subtract(endPoint)
            }
            return status;
        }
    }
}

const BezeirPath = (): BasePath => {
    return null;
}

const SpiralPath = (): BasePath => {
    return null;
}

const BlendPath = (): BasePath => {
    return null;
}

const PATH_MAP: { [key: string | number]: BasePath } = (() => {
    let map = {};
    for (let i = 1000; i <= 1100; i++) {
        map[i] = SimplePath([new Vector3(-300, -72, 20), new Vector3(200, -36, 20)]);
    }
    return map;
})();

export const getNextPointStatus = (pathId: number, per: number): INextStatus => {
    return PATH_MAP[pathId].lerp(per);
}