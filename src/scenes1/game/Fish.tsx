import '@babylonjs/loaders/glTF';
import { AnimationGroup, TransformNode, Mesh, BoundingInfo, Vector3, Ray, Color3, Vector2 } from '@babylonjs/core';
import { ContainerAssetTask, MeshBuilder } from '@babylonjs/core';
import { useEffect, useRef, useState } from 'react';
import { BabylonNode, FiberTransformNodeProps, FiberTransformNodePropsCtor, useScene } from 'react-babylonjs';
import { ContainerTask, TaskType, useOverrideAssetManager } from '../../loaders/babylonjs/useAssetContainer';

export type IFishProps = {
    fishType: number,
    name: string,
    status: string
} & FiberTransformNodeProps & FiberTransformNodePropsCtor & BabylonNode<TransformNode>;


export const Fish = (props: IFishProps) => {
    const fishRef = useRef<Mesh>();
    const [instance, setInstance] = useState<TransformNode>(null);
    const [animationMap, setAnimationMap] = useState<{ [key: string]: AnimationGroup }>({});

    const taskName = `taskFish${2000||props.fishType}`;
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
            const task: ContainerAssetTask = result.taskNameMap[taskName] as ContainerAssetTask;
            const entries = task.loadedContainer.instantiateModelsToScene((name) => {
                return `${props.name}_${name}`
            });

            const map = {};
            entries.animationGroups.forEach((value) => {
                map[value.name] = value;
            });

            setInstance(entries.rootNodes[0]);
            setAnimationMap(map);

            const t: Mesh = entries.rootNodes[0] as Mesh;
            t.setBoundingInfo(new BoundingInfo(BOUNDING_INFO_FISH_ID_MAP[2019].min, BOUNDING_INFO_FISH_ID_MAP[2019].max));
            t.showBoundingBox=true;
        }
    }, [result]);

    useEffect(() => {
        if (instance) {
            animationMap['Swim'].start(true);
        }
    }, [instance]);

    // const meshes = (result.taskNameMap[taskName] as ContainerAssetTask).loadedMeshes as Mesh[];
    // const realMeshes = [...meshes].splice(1, meshes.length - 1);
    // return <transformNode {...props}>
    //         {
    //             realMeshes.map(mesh => {
    //                 return <instancedMesh key={mesh.name} name={mesh.name} source={mesh} disposeInstanceOnUnmount={true} />  
    //             })
    //         }
    //     </transformNode>
    return instance && <mesh ref={fishRef} fromInstance={instance} {...props} disposeInstanceOnUnmount={true} setPivotPoint={[new Vector3(2 , 0, -4)]}/>;
}

const BOUNDING_INFO_FISH_ID_MAP = {
    2019: {
        min: new Vector3(-5,5,-22),
        max: new Vector3(5,15,8)
    }
}