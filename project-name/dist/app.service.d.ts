import { ScoreDto } from './dtos';
import Redis from 'ioredis';
export declare class AppService {
    private readonly redis;
    async: any;
    private readonly key;
    constructor(redis: Redis);
    addScore(request: ScoreDto): Promise<number>;
    getScoreList(): Promise<ScoreDto[]>;
    getRank(name: string): Promise<number>;
    getScore(name: string): Promise<ScoreDto>;
}
