import { PropsWithChildren, useEffect } from "react"
import { Container, _ReactPixi } from "@inlet/react-pixi"

type IButtonProps = PropsWithChildren<_ReactPixi.IContainer> & {
      
};

export const UIButton = (props: IButtonProps) => {
    const { click } = props;

    function onClick(args) {
        if (click) click(args);
    }

    return <Container {...props} click={onClick}>
        {props.children}
    </Container>
}