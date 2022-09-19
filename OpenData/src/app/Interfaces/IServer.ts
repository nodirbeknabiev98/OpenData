import { ServerModel } from "../Models/ServerModel";
import { Observable } from "rxjs";
import { ServerMessageModel } from "../Models/ServerMessageModel";

export interface IServer {
    getServers(): Observable<ServerModel[]>;
    updateServer(payload: ServerMessageModel):Observable<any>;
}
