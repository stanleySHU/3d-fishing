import { _ReactPixi, Text } from "@inlet/react-pixi"
import { getFCChipAmount } from "../../units/chips";

type FCChipTextProps = {
    amount: number,
} & _ReactPixi.IText;

export const FCChipText = (props: FCChipTextProps) => {
    const { amount } = props;
    
    return <Text {...props} text={getFCChipAmount(amount)}/>
}