import { AnimationGroup, TransformNode, Mesh } from '@babylonjs/core';
import '@babylonjs/loaders/glTF';
import { ContainerAssetTask } from '@babylonjs/core';
import { useEffect, useState } from 'react';
import { BabylonNode, FiberTransformNodeProps, FiberTransformNodePropsCtor } from 'react-babylonjs';
import { ContainerTask, TaskType, useOverrideAssetManager } from '../../loaders/babylonjs/useAssetContainer';

export type IFishProps = {
    fishType: number,
    name: string,
    status: string
} & FiberTransformNodeProps & FiberTransformNodePropsCtor & BabylonNode<TransformNode>;


export const Fish = (props: IFishProps) => {
    const { status } = props;
    const [instance, setInstance] = useState<TransformNode>(null);
    const [animationMap, setAnimationMap] = useState<{ [key: string]: AnimationGroup }>({});

    const taskName = `taskFish${props.fishType}`;
    const task: ContainerTask = {
        taskType: TaskType.Container,
        name: taskName,
        rootUrl: '/assets/gltf/',
        sceneFilename: `${'shark_simple_anim_v06'}.gltf`
    };
    const result = useOverrideAssetManager([task], {
        useDefaultLoadingScreen: false,
    });
    
    useEffect(() => {
        if (!instance) {
            // const task: ContainerAssetTask = result.taskNameMap[taskName] as ContainerAssetTask;
            // const entries = task.loadedContainer.instantiateModelsToScene((name) => {
            //     return `${props.name}_${name}`
            // });

            // const map = {};
            // entries.animationGroups.forEach((value) => {
            //     map[value.name] = value;
            // });

            // setInstance(entries.rootNodes[0]);
            // setAnimationMap(map);
        }
    }, [result]);

    useEffect(() => {
        if (instance) {
            // console.log(animationMap)
            animationMap['Swim'].start(true);
        }
    }, [instance]);

    const meshes = (result.taskNameMap[taskName] as ContainerAssetTask).loadedMeshes as Mesh[];
    const realMeshes = [...meshes].splice(1, meshes.length - 1);
    return <transformNode {...props}>
            {
                realMeshes.map(mesh => {
                    return <instancedMesh key={mesh.name} name={mesh.name} source={mesh}/>  
                })
            }
        </transformNode>
    // return instance && <transformNode fromInstance={instance} {...props} />;
}