import { Server } from 'socket.io';
import { AppService } from '../app.service';
export declare class SocketClient {
    private readonly appService;
    readonly server: Server;
    constructor(appService: AppService);
    handleGetScoreListEvent(message: string): string;
    handleGetRankEvent(message: string): string;
}
