import { AbstractAssetTask, AssetsManager } from "@babylonjs/core";

export type IResourceInitial = {
    url: string,
    taskName: string,
    cache?: boolean
}

export abstract class Resource {
    protected task;
    private _cache: boolean;

    get cache(): boolean {
        return this._cache;
    }

    addTask(loader: AssetsManager, props: IResourceInitial) {
        let task = this.getTask(loader, props);
        task.onSuccess = this.onSuccess.bind(this);

        const { cache } = props;
        this._cache = cache;
    }

    abstract getTask(loader: AssetsManager, props: IResourceInitial): AbstractAssetTask;

    onSuccess(task: AbstractAssetTask) {
        this.task = task;
    }
}