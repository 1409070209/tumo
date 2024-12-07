import { Injectable } from '@nestjs/common';
import { ScoreDto } from './dtos';
import { InjectRedis } from '@nestjs-modules/ioredis';
import Redis from 'ioredis';
import { chunk } from 'lodash';

@Injectable()
export class AppService {
  async;
  private readonly key = 'nuo.lei.redis.key';

  constructor(@InjectRedis() private readonly redis: Redis) {}

  async addScore(request: ScoreDto): Promise<number> {
    return this.redis.zadd(this.key, request.score, request.name);
  }

  async getScoreList(): Promise<ScoreDto[]> {
    const res: string[] = await this.redis.zrevrange(
      this.key,
      0,
      200,
      'WITHSCORES',
    );
    const data = chunk(res, 2);
    return data.map(([name, score]) => {
      return {
        name,
        score: parseInt(score),
      };
    });
  }

  async getRank(name: string): Promise<number> {
    const res: number = await this.redis.zrevrank(this.key, name);
    console.log(res);
    return res;
  }

  async getScore(name: string): Promise<ScoreDto> {
    const res = await this.redis.zscore(this.key, name);
    console.log(res);
    return {
      name,
      score: Math.floor(Number(res as string)),
    };
  }
}
