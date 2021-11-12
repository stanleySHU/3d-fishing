import { InstancedMesh, Vector3, Mesh } from '@babylonjs/core';
import '@babylonjs/loaders/glTF';
import { useEffect, useRef } from 'react';
import { BabylonNode, FiberInstancedMeshProps, FiberInstancedMeshPropsCtor, useSceneLoader } from 'react-babylonjs';

export type IFishProps = {
    fishType: number,
    name: string,
} & FiberInstancedMeshProps & BabylonNode<InstancedMesh>;

export const Fish = (props: IFishProps) => {
    const result = useSceneLoader('/assets/gltf/', `${props.fishType}.gltf`,null, {
        meshNames: ''
    }); 

    return  result.meshes && <instancedMesh source={result.meshes[1] as Mesh} scaling={new Vector3(10, 10, 10)} {...props}/>; 
}