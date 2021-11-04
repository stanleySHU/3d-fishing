import { AbstractAssetTask, AssetsManager, EquiRectangularCubeTextureAssetTask, ImageAssetTask, TextureAssetTask } from "@babylonjs/core";
import { IResourceInitial, Resource } from "./Resource";

export type IEquiRectangularCubeTextureResourceInitial = IResourceInitial & {
    size: number,
    noMipmap: boolean,
    gammaSpace: boolean
};

export class ImageResource extends Resource {
    getTask(loader: AssetsManager, props: IEquiRectangularCubeTextureResourceInitial): EquiRectangularCubeTextureAssetTask {
        return loader.addEquiRectangularCubeTextureAssetTask(props.taskName, props.url, props.size);
    }

    onSuccess(task: EquiRectangularCubeTextureAssetTask) {
        super.onSuccess(task);
    }

    onError(task: EquiRectangularCubeTextureAssetTask, message?: string, exception?: any) {
        super.onError(task, message, exception);
    }
}