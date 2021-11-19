import { Vector3, Scalar } from "@babylonjs/core";

export function randomStraight(width: number, height: number, depth: number, cameraY: number): [Vector3, Vector3] {
    const RandomRangeHalf = (length: number): number => {
        return Scalar.RandomRange(-length / 2, length / 2);
    }
    switch (Math.floor(Math.random() * 2)) {
        // case 0: {
        //     const nearX = RandomRangeHalf(width),
        //         nearZ = RandomRangeHalf(height),
        //         multip = (depth + cameraY) / cameraY,
        //         maxWidth = width * multip,
        //         maxHeight = height * multip,
        //         farX = RandomRangeHalf(maxWidth),
        //         farZ = RandomRangeHalf(maxHeight);
        //     return [new Vector3(farX, -depth, farZ), new Vector3(nearX, 0, nearZ)];
        // }
        case 0: {
            const leftY = Scalar.RandomRange(-depth, 0),
                leftMultip = (-leftY + cameraY) / cameraY,
                leftMaxWidth = width * leftMultip,
                leftMaxHeight = height * leftMultip,
                leftX = -leftMaxWidth / 2,
                leftZ = RandomRangeHalf(leftMaxHeight),
                rightY = Scalar.RandomRange(-depth, 0),
                rightMultip = (-rightY + cameraY) / cameraY,
                rightMaxWidth = width * rightMultip,
                rightMaxHeight = height * rightMultip,
                rightX = rightMaxWidth / 2,
                rightZ = RandomRangeHalf(rightMaxHeight),
                points: [Vector3, Vector3] = [new Vector3(leftX, leftY, leftZ), new Vector3(rightX, rightY, rightZ)];
            if (Math.round(Math.random()) == 0) {
                points.reverse();
            }
            return points;
        }
        case 1:
            const topY = Scalar.RandomRange(-depth, 0),
                topMultip = (-topY + cameraY) / cameraY,
                topMaxWidth = width * topMultip,
                topMaxHeight = height * topMultip,
                topZ = topMaxHeight / 2,
                topX = RandomRangeHalf(topMaxWidth),
                bottomY = Scalar.RandomRange(-depth, 0),
                bottomMultip = (-bottomY + cameraY) / cameraY,
                bottomMaxWidth = width * bottomMultip,
                bottomMaxHeight = height * bottomMultip,
                bottomZ = -bottomMaxHeight / 2,
                bottomX = RandomRangeHalf(bottomMaxWidth),
                points: [Vector3, Vector3] = [new Vector3(topX, topY, topZ), new Vector3(bottomX, bottomY, bottomZ)];
            if (Math.round(Math.random()) == 0) {
                points.reverse();
            }
            return points;
        default: {
            return [new Vector3(0, -depth, 0), new Vector3(0, 0, 0)];
        }
    }
}