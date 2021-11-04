import { AbstractAssetTask, AssetsManager, ImageAssetTask } from "@babylonjs/core";
import { IResourceInitial, Resource } from "./Resource";

export type IImageResourceInitial = IResourceInitial & {}

export class ImageResource extends Resource {
    getTask(loader: AssetsManager, props: IImageResourceInitial): AbstractAssetTask {
        return loader.addImageTask(props.taskName, props.url);
    }

    onSuccess(task: ImageAssetTask) {
        super.onSuccess(task);
    }

    onError(task: ImageAssetTask, message?: string, exception?: any) {
        super.onError(task, message, exception);
    }
}