import React, { ReactElement, ReactNode, useEffect, useRef, useState } from "react"
import { Scene, useScene } from "react-babylonjs"
import { AbstractAssetTask, AssetsManager as BabylonAssetsManager } from '@babylonjs/core';
import { IResourceInitial, Resource } from "./Resource";
import { MeshResource } from "./MeshResource";
import { TextFileResource } from "./TextFileResource";
import { ImageResource } from "./ImageResource";
import { TextureResource } from "./TextureResource";

export type IPreloadViewProps = {
    progress: number
}

type IAssetsManagerProps = {
    children: ReactNode,
    PreloadView: (props: IPreloadViewProps) => JSX.Element,
    onFinish: () => void,
    onLoadFail: () => void;
    retry?: number
}

const AssetsManagerWithCache = () => {
    const taskMap: { [taskName: string]: Resource } = {};
    const resourceMap: { [taskName: string]: Resource } = {};
    let retryCount, totalCount, completeCount;

    return {
        useAssetsManager: () => {
            return {
                getResource<T>(taskName: string): T {
                    return resourceMap[taskName] as any;
                }
            };
        },
        AssetsLoader: (props: IAssetsManagerProps) => {
            const sceneAssetsManager = useRef<BabylonAssetsManager>(null);
            const scene = useScene();
            const { children, retry, PreloadView, onFinish, onLoadFail } = props;
            const [progress, setProgress] = useState(0);

            function finish(tasks: AbstractAssetTask[]) {
                if (totalCount == completeCount) {
                    setProgress(100);
                    sceneAssetsManager.current.reset();
                    onFinish();
                } else {
                    if (retryCount > 0) {
                        --retryCount;
                        sceneAssetsManager.current.load();
                    } else {
                        onLoadFail();
                    }
                }
            }

            function onTaskSuccess(task: AbstractAssetTask) {
                let taskName = task.name,
                    resource = taskMap[taskName];
                delete taskMap[taskName];
                resource.cache == 'global-cache' && (resourceMap[taskName] = resource);

                ++completeCount;
                let progress = completeCount / totalCount * 100;
                setProgress(progress);
            }

            function onTaskError(task: AbstractAssetTask) {
                task.reset();
            }

            useEffect(() => {
                sceneAssetsManager.current = new BabylonAssetsManager(scene);
                const manager = sceneAssetsManager.current;
                // manager.useDefaultLoadingScreen = false;

                totalCount = completeCount = 0;
                retryCount = retry || 2;
                React.Children.forEach(children, (child: React.ReactElement<IResourceInitial>) => {
                    let type = child.type as string, props = child.props, { taskName } = props;
                    if (!resourceMap[taskName]) {
                        let resource = resolveTask(type);
                        resource.addTask(manager, props);
                        taskMap[taskName] = resource;
                        ++totalCount;
                    }
                });
                manager.onFinish = finish;
                manager.onTaskSuccess = onTaskSuccess;
                manager.onTaskError = onTaskError;
                manager.load();
            }, []);

            return <PreloadView progress={progress} />;
        }
    }
}

export const {useAssetsManager, AssetsLoader} = AssetsManagerWithCache();


export function resolveTask(type: string): Resource {
    switch (type) {
        case "taskMesh": {
            return new MeshResource();
        }
        case "taskTextFile": {
            return new TextFileResource();
        }
        case "taskBinaryFile": {
            break;
        }
        case "taskImg": {
            return new ImageResource();
        }
        case "taskTexture": {
            return new TextureResource();
        }
        case "taskCubeTexture": {
            break;
        }
        case "taskHDRCubeTexture": {
            break;
        }
        case "taskEquiRectangularCubeTexture": {
            break;
        }
        default: break;
    }
    return null;
}