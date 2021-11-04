import { AbstractAssetTask, AssetsManager } from "@babylonjs/core";

export type IResourceInitial = {
    url: string,
    taskName: string,
    retry?: number
}

export abstract class Resource {
    addTask(loader: AssetsManager, props: IResourceInitial) {
        let task = this.getTask(loader, props);
        task.onSuccess = this.onSuccess.bind(this);
        task.onError = this.onError.bind(this);
    }

    abstract getTask(loader: AssetsManager, props: IResourceInitial): AbstractAssetTask;

    onSuccess(task: any) {
        console.log(`${task.name} successed`);
    }

    onError(task: any, message?: string, exception?: any) {
        console.log(`${task.name} error, message: ${message}`);
    }
}