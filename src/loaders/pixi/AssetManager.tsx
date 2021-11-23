import React, { PropsWithChildren, ReactElement, useEffect, useState } from "react";
import { Loader, LoaderResource } from 'pixi.js';
import { IPreloadViewProps } from "../../components/PreloadView";

type IAssetManagerProps = {
    PreloadView: React.FC<IPreloadViewProps>,
    onFinish?: () => void,
    onLoadFail?: () => void;
    retry?: number
}

type ITaskProps = {
    name: string,
    src: string
}

let taskMap: { [taskName: string]: any } = {};
let resourceMap: { [taskName: string]: LoaderResource } = {};
let retryTasks: { [taskName: string]: any } = {};
let retryCount: number = 0;

const loader = Loader.shared;
loader.pre(cachingMiddleware);
loader.use(parsingMiddleware);

function cachingMiddleware(e: LoaderResource, next) {
    next();
}

function parsingMiddleware(e: LoaderResource, next) {
    next();
}

function addTask(e: ITaskProps) {
    const { name, src } = e;
    const resource = resourceMap[name];
    if (!resource) {
        const handle = () => {
            loader.add(name, src, {
                timeout: 15 * 1000
            });
        }
        handle();
        taskMap[name] = handle;
    }
}

function runRetryTask() {
    loader.reset();
    for (let name in retryTasks) {
        retryTasks[name]();
    }
    taskMap = retryTasks;
    retryTasks = {};
    retryCount--;
}

export const useAssetsManager = () => {
    return resourceMap;
}

export const AssetManager = (props: PropsWithChildren<IAssetManagerProps>) => {
    const { PreloadView, onFinish, onLoadFail, retry } = props;
    const [progress, setProcess] = useState<number>(0);

    function onProgress(e: Loader, resource: LoaderResource) {
        setProcess(e.progress);
    }

    function onComplete(e: Loader, resourceMap: { [name: string]: LoaderResource }) {
        let existRetryTask = false;
        for (let _ in retryTasks) {
            existRetryTask = true;
            break;
        }
        if (existRetryTask) {
            if (retryCount == 0) {
                onLoadFail && onLoadFail();
            } else {
                runRetryTask(); 
            }
        } else {
            onFinish && onFinish();
        }
    }

    function onError(error: Error, loader: Loader, resource: LoaderResource) {
        const name = resource.name, handle = taskMap[name];
        if (handle) {
            retryTasks[name] = handle;
        }
    }

    useEffect(() => {
        retryCount = retry;
        const progressSignal = loader.onProgress.add(onProgress),
            completeSignal = loader.onComplete.add(onComplete),
            errorSignal = loader.onError.add(onError);
        return () => {
            loader.onProgress.detach(progressSignal);
            loader.onComplete.detach(completeSignal);
            loader.onError.detach(errorSignal);
            loader.reset();
        }
    }, []);
    return <>
        {props.children}
        <PreloadView progress={progress} />
    </>;
};

export const Task = (props: ITaskProps) => {
    const { name, src } = props;

    const onLoad = (e: Loader, resource: LoaderResource) => {
        if (resource.name == name) {
            resourceMap[name] = resource;
        }
    }

    useEffect(() => {
        addTask(props);
        const loadSignal = loader.onLoad.add(onLoad);
        return () => {
            loader.onLoad.detach(loadSignal);
        }
    }, []);
    return null;
}

export const RunTask = () => {
    useEffect(() => {
        loader.load();
    }, []);
    return null;
}