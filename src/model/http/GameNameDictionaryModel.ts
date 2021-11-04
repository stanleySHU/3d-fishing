import { ILanguageType } from "../../units/customType";
import { BaseHttpModel } from "./BaseHttpModel";

export interface GameNameDictionaryModel extends BaseHttpModel {
    readonly language: ILanguageType;
    readonly nameMap: {readonly[key: string]: string};
}