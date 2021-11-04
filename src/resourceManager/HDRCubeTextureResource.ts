import { AbstractAssetTask, AssetsManager, HDRCubeTextureAssetTask, ImageAssetTask, TextureAssetTask } from "@babylonjs/core";
import { IResourceInitial, Resource } from "./Resource";

export type IHDRCubeTextureResourceInitial = IResourceInitial & {
    size: number,
    noMipmap: boolean,
    generateHarmonics: boolean,
    gammaSpace: boolean,
    reserved: boolean
};

export class ImageResource extends Resource {
    getTask(loader: AssetsManager, props: IHDRCubeTextureResourceInitial): HDRCubeTextureAssetTask {
        return loader.addHDRCubeTextureTask(props.taskName, props.url, props.size);
    }

    onSuccess(task: HDRCubeTextureAssetTask) {
        super.onSuccess(task);
    }

    onError(task: HDRCubeTextureAssetTask, message?: string, exception?: any) {
        super.onError(task, message, exception);
    }
}