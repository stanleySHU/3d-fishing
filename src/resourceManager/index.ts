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