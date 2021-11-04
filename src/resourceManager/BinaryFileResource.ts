import { AbstractAssetTask, AssetsManager, BinaryFileAssetTask, ImageAssetTask } from "@babylonjs/core";
import { IResourceInitial, Resource } from "./Resource";

export type IBinaryResourceInitial = IResourceInitial & {

};

export class ImageResource extends Resource {
    getTask(loader: AssetsManager, props: IBinaryResourceInitial): BinaryFileAssetTask {
        return loader.addBinaryFileTask(props.taskName, props.url);
    }

    onSuccess(task: BinaryFileAssetTask) {
        super.onSuccess(task);
    }

    onError(task: BinaryFileAssetTask, message?: string, exception?: any) {
        super.onError(task, message, exception);
    }
}