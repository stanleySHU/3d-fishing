import { PropsWithChildren, useCallback } from "react";
import { Container, _ReactPixi } from '@inlet/react-pixi/animated'
import { useSpring } from 'react-spring';
import { throttle } from "../../units/function";


type IButtonProps = PropsWithChildren<any> & {
    enable?: boolean,
    throttleTime?: number
};

export const UIButton = (props: IButtonProps) => {
    const { click, throttleTime } = props;

    const onClick = throttle(args => {
        click && click(args);
    }, throttleTime || 300)

    return <Container interactive={props.enable !== false} cursor="pointer" {...props} click={onClick}>
        {props.children}
    </Container>
}

export const UIButtonWithAnimation = (props: IButtonProps) => {
    const { click } = props;

    const styles = useSpring({
        loop: {
            reverse: true,
            loop: false
        },
        from: { alpha: 1 },
        to: { alpha: 0 },
        reset: true,
        immediate: true
    });

    const onClick = (args) => {
        click && click(args);
        styles.alpha.reset();
    }

    return <UIButton {...props} click={onClick} {...styles}/>
}