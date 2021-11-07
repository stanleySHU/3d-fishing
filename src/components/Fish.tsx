import { Mesh, Vector3 } from '@babylonjs/core';
import '@babylonjs/loaders/glTF';
import { BabylonNode, FiberMeshProps, FiberMeshPropsCtor, useSceneLoader } from 'react-babylonjs';

export type IFishProps = {
    fishType: number
} & FiberMeshProps & FiberMeshPropsCtor & BabylonNode<Mesh>;

export const Fish = (props: IFishProps) => {
    const result = useSceneLoader('/assets/gltf/', `${props.fishType}.gltf`,null, {
        meshNames: ''
    });
    return  result.meshes && <mesh fromInstance={result.meshes[0]} scaling={new Vector3(50, 50, 50)} {...props}/>
}