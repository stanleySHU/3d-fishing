import { Avatar } from "../../components/babylonjs/Avatar";
import { AtlasGames } from "../assets";

export const InSeatUserLayer = (props) => {
    return <container>
        <container>
            <container width="73px" height="70px" left={122} top={47} verticalAlignment={0} horizontalAlignment={0}>
                <AtlasGames img="img_avatar_container.png" width="73px" height="70px" rotation={3.14} />
                <Avatar index={0} width={0.85} height={0.85} />
            </container>
            <container width="168px" height="43px" left={74} top={5} verticalAlignment={0} horizontalAlignment={0}>
                <AtlasGames img="img_info_container.png" width="168px" height="43px" />
            </container>
            <container width="183px" height="72px" left={250} top={-16} verticalAlignment={0} horizontalAlignment={0}>
                <AtlasGames img="img_cannon_container_large.png" width="183px" height="72px" />
                <AtlasGames img="img_cannon_value_container.png" width="68px" height="33px" />
            </container>
        </container>
        <container>
            <container width="73px" height="70px" left={816} top={47} verticalAlignment={0} horizontalAlignment={0}>
                <AtlasGames img="img_avatar_container.png" width="73px" height="70px" rotation={3.14} />
                <Avatar index={0} width={0.85} height={0.85} />
            </container>
            <container width="168px" height="43px" left={767} top={5} verticalAlignment={0} horizontalAlignment={0}>
                <AtlasGames img="img_info_container.png" width="168px" height="43px" />
            </container>
            <container width="183px" height="72px" left={576} top={-16} verticalAlignment={0} horizontalAlignment={0}>
                <AtlasGames img="img_cannon_container_large.png" width="183px" height="72px" />     
                <AtlasGames img="img_cannon_value_container.png" width="68px" height="33px" />
            </container>
        </container>
        <container>
            <container width="73px" height="70px" left={122} top={422   } verticalAlignment={0} horizontalAlignment={0}>
                <AtlasGames img="img_avatar_container.png" width="73px" height="70px" />
                <Avatar index={0} width={0.85} height={0.85} />
            </container>
            <container width="168px" height="43px" left={74} top={492} verticalAlignment={0} horizontalAlignment={0}>
                <AtlasGames img="img_info_container.png" width="168px" height="43px" />
            </container>
            <container width="183px" height="72px" left={250} top={484} verticalAlignment={0} horizontalAlignment={0}>
                <AtlasGames img="img_cannon_container_large.png" width="183px" height="72px" />     
                <AtlasGames img="img_cannon_value_container.png" width="68px" height="33px" />
            </container>
        </container>
        <container>
            <container width="73px" height="70px" left={816} top={422} verticalAlignment={0} horizontalAlignment={0}>
                <AtlasGames img="img_avatar_container.png" width="73px" height="70px" />
                <Avatar index={0} width={0.85} height={0.85} />
            </container>
            <container width="168px" height="43px" left={767} top={492} verticalAlignment={0} horizontalAlignment={0}>
                <AtlasGames img="img_info_container.png" width="168px" height="43px" />
            </container>
            <container width="183px" height="72px" left={576} top={484} verticalAlignment={0} horizontalAlignment={0}>
                <AtlasGames img="img_cannon_container_large.png" width="183px" height="72px" />          
                <AtlasGames img="img_cannon_value_container.png" width="68px" height="33px" />
            </container>
        </container>
    </container>;
}