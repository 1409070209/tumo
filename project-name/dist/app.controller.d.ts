import { AppService } from './app.service';
import { ScoreDto } from './dtos';
import { Socket } from 'socket.io';
import { SocketClient } from './socket-module/socket.client';
export declare class AppController {
    private readonly appService;
    private readonly socketClient;
    constructor(appService: AppService, socketClient: SocketClient);
    addScore(params: ScoreDto): Promise<number>;
    getScoreList(client: Socket): Promise<ScoreDto[]>;
    getScore(name: string): Promise<ScoreDto>;
    getRank(name: string): Promise<number>;
}
