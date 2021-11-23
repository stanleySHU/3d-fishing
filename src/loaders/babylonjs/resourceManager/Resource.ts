import { AbstractAssetTask, AssetsManager } from "@babylonjs/core";
export type IResourceInitial = {
    url: string,
    taskName: string,
    cache?: boolean
}

export type IAssetsCacheType = 'no-cache' | 'global-cache' | 'scene-cache';

export abstract class Resource {
    protected task;
    readonly cache: IAssetsCacheType;

    constructor(cache: IAssetsCacheType = 'no-cache') {
        this.cache = cache;
    }

    addTask(loader: AssetsManager, props: IResourceInitial) {
        let task = this.getTask(loader, props);
        task.onSuccess = this.onSuccess.bind(this);
    }

    abstract getTask(loader: AssetsManager, props: IResourceInitial): AbstractAssetTask;

    onSuccess(task: AbstractAssetTask) {
        this.task = task;
    }
}