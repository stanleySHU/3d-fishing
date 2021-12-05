import { PropsWithChildren, useCallback } from "react";
import { Container, _ReactPixi } from '@inlet/react-pixi/animated'
import { useSpring } from 'react-spring';
import { throttle } from "../../units/function";


type IButtonProps = PropsWithChildren<any> & {
    enable?: boolean
};

export const UIButton = (props: IButtonProps) => {
    return <Container interactive={props.enable !== false} cursor="pointer" {...props}>
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

    const onClick = throttle(args => {
        click && click(args);
        styles.alpha.reset();
    }, 500)

    return <UIButton {...props} click={onClick} {...styles}/>
}