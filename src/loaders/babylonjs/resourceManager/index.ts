import { IBinaryResourceInitial } from './BinaryFileResource';
import { ICubeTextureResourceInitial } from './CubeTextureManager';
import { IEquiRectangularCubeTextureResourceInitial } from './EquiRectangularCubeTextureResource';
import { IHDRCubeTextureResourceInitial } from './HDRCubeTextureResource';
import { IImageResourceInitial } from './ImageResource';
import { IMeshResourceInitial } from './MeshResource';
import { ITextFileResourceInitial } from './TextFileResource';
import { ITextureResourceInitial } from './TextureResource';

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