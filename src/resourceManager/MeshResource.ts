import { AssetsManager, MeshAssetTask, Vector3 } from "@babylonjs/core";
import { IResourceInitial, Resource } from "./Resource";

export type IMeshResourceInitial = IResourceInitial & {
    meshName: string,
    sceneFileName: string
};

export class MeshResource extends Resource {
    getTask(loader: AssetsManager, props: IMeshResourceInitial): MeshAssetTask {
        return loader.addMeshTask(props.taskName, props.meshName, props.url, props.sceneFileName);
    }

    onSuccess(task: MeshAssetTask) {
       console.log(task.loadedMeshes[1]);
    }

    onError(task: MeshAssetTask, message?: string, exception?: any) {
        super.onError(task, message, exception);
    }
}
