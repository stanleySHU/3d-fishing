import { useContext, useEffect, useState } from "react";
import { HttpService } from "../services/http";
import { WebsocketService } from "../services/websocket";
import { AuthModel } from "../model/http/AuthModel";
import { AppContext } from "../model/data/AppProvider";

export const Auth = (props) => {
  const httpService = HttpService();
  const { context } = useContext(AppContext);
  const [model, setModel] = useState<AuthModel>(null);

  useEffect(() => {
    httpService
    .auth(context.getAuthParams())
    .then((e) => {
      setModel(e);
    })
    .catch(() => {

    });

    return () => {
    }
  }, []);

  return model && <Websocket model={model}/>;
}  

export const Websocket = (props: {model: AuthModel}) =>  {
  const websocket = WebsocketService();
  const { model } = props;
  useEffect(() => {
    websocket.initConnect(model.internalToken, model.lobbyServerWebSocketDomains, model.lobbyServerWebSocketPorts);
  }, []);
  return null;
}