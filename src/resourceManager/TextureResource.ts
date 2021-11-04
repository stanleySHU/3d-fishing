import { AssetsManager, TextureAssetTask } from "@babylonjs/core";
import { IResourceInitial, Resource } from "./Resource";

export type ITextureResourceInitial = IResourceInitial & {
    noMipmap?: boolean,
    invertY?: boolean,
    samplingMode?: number
};

export class TextureResource extends Resource {
    getTask(loader: AssetsManager, props: ITextureResourceInitial): TextureAssetTask {
        const { taskName, url, noMipmap, invertY, samplingMode } = props;
        return loader.addTextureTask(props.taskName, props.url, noMipmap, invertY, samplingMode);
    }

    onSuccess(task: TextureAssetTask) {
        super.onSuccess(task);
    }

    onError(task: TextureAssetTask, message?: string, exception?: any) {
        super.onError(task, message, exception);
    }
}