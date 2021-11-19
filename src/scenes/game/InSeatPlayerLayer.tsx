import { AtlasGames } from "../assets";

export const InSeatPlayerLayer = (props) => {
    return <container>
        {
            [
                {x: 282, y: -16},
                {x: 606, y: -16},
                {x: 282, y: 484},
                {x: 606, y: 484}
            ].map((item, index) => {
                return <container key={`BuyIn${index}`} left={item.x} top={item.y} width="122px" height="72px" horizontalAlignment={0} verticalAlignment={0} color='transparent'>
                <AtlasGames img="img_cannon_container_small_up.png" width="122px" height="72px" />
                {/* cannon */}
                <AtlasGames img="img_cannon_value_container.png" width="68px" height="33px" />
            </container>
            })
        }
    </container>
}