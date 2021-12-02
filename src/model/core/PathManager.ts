import { Scalar, Vector3 } from "@babylonjs/core";
import { randomStraight } from "../../units/pathTool";

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
                direction: endPoint.subtract(startPoint)
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
    for (let i = 1000; i <= 2000; i++) {
        map[i] = SimplePath(randomStraight(96, 54, 72, 27));
    }
    return map;
})();

export const getNextPointStatus = (pathId: number, per: number): INextStatus => {
    return PATH_MAP[pathId].lerp(per);
}