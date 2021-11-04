import { AssetsManager, TextFileAssetTask } from "@babylonjs/core";
import { IResourceInitial, Resource } from "./Resource";

export type ITextFileResourceInitial = IResourceInitial & {};


export class TextFileResource extends Resource {
    getTask(loader: AssetsManager, props: ITextFileResourceInitial): TextFileAssetTask {
        return loader.addTextFileTask(props.taskName, props.url);
    }

    onSuccess(task: TextFileAssetTask) {
       
    }

    onError(task: TextFileAssetTask, message?: string, exception?: any) {
        super.onError(task, message, exception);
    }
}