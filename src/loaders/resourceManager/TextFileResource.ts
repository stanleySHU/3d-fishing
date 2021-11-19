import { AssetsManager, TextFileAssetTask } from "@babylonjs/core";
import { IResourceInitial, Resource } from "./Resource";

export type ITextFileResourceInitial = IResourceInitial & {};


export class TextFileResource extends Resource {
    private map: { [key: string]: any } = {};

    constructor() {
        super('global-cache');
    }

    getTask(loader: AssetsManager, props: ITextFileResourceInitial): TextFileAssetTask {
        return loader.addTextFileTask(props.taskName, props.url);
    }

    onSuccess(task: TextFileAssetTask) {
        super.onSuccess(task);
    }

    get text(): string {
        return this.task.text;
    }

    getjson<T>(): T {
        let json = this.map['json'];
        if (!json) {
            this.map['json'] = JSON.parse(this.text);
        }
        return json;
    }
}