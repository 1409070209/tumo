import { AppService } from './app.service';
import { ScoreDto } from './dtos';
import { ConnectedSocket } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { SocketClient } from './socket-module/socket.client';

@Controller('score')
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly socketClient: SocketClient,
  ) {}

  @Post('')
  async addScore(@Body() params: ScoreDto): Promise<number> {
    console.log(`add score ${JSON.stringify(params)}`);
    const res = await this.appService.addScore(params);
    const allScore = await this.appService.getScoreList();
    this.socketClient.server.emit('getScoreList', allScore as any);
    allScore.map((item) => {
      this.appService.getRank(item.name).then((data) => {
        console.log(`getRank_${item.name}`);
        this.socketClient.server.emit(`getRank_${item.name}`, data as any);
      });
    });
    return res;
  }

  @Get('')
  async getScoreList(@ConnectedSocket() client: Socket): Promise<ScoreDto[]> {
    console.log(123);
    client.emit('getScoreList');

    return (await this.appService.getScoreList()) as any;
  }

  @Get(':name')
  async getScore(@Param('name') name: string): Promise<ScoreDto> {
    console.log(`get score ${JSON.stringify(name)}`);
    return await this.appService.getScore(name);
  }

  @Get(':name/rank')
  async getRank(@Param('name') name: string): Promise<number> {
    console.log(`get rank ${JSON.stringify(name)}`);

    return this.appService.getRank(name);
  }
}
