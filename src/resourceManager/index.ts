import { IBinaryResourceInitial } from './BinaryFileResource';
import { ICubeTextureResourceInitial } from './CubeTextureManager';
import { IEquiRectangularCubeTextureResourceInitial } from './EquiRectangularCubeTextureResource';
import { IHDRCubeTextureResourceInitial } from './HDRCubeTextureResource';
import { IImageResourceInitial, ImageResource } from './ImageResource';
import { IMeshResourceInitial, MeshResource } from './MeshResource';
import { Resource } from './Resource';
import { ITextFileResourceInitial, TextFileResource } from './TextFileResource';
import { ITextureResourceInitial, TextureResource } from './TextureResource';

declare global {
    namespace JSX {
        interface IntrinsicElements {
            taskBinary: IBinaryResourceInitial,
            taskCTexture: ICubeTextureResourceInitial,
            taskERCTexture: IEquiRectangularCubeTextureResourceInitial,
            taskHDRCTexture: IHDRCubeTextureResourceInitial,
            taskImg: IImageResourceInitial,
            taskMesh: IMeshResourceInitial,
            taskTextFile: ITextFileResourceInitial,
            taskTexture: ITextureResourceInitial
        }
    }
}

export function resolveTask(type: string): Resource {
    switch(type) {
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