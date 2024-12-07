import { Injectable } from '@nestjs/common';
import { Server } from 'socket.io';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { AppService } from '../app.service';

@Injectable()
@WebSocketGateway({ cors: { origin: '*' } })
export class SocketClient {
  @WebSocketServer()
  public readonly server: Server;

  constructor(private readonly appService: AppService) {}

  @SubscribeMessage('getScoreList')
  handleGetScoreListEvent(@MessageBody() message: string): string {
    console.log(message);
    return message;
  }

  @SubscribeMessage('getRank')
  handleGetRankEvent(@MessageBody() message: string): string {
    console.log(`name rank is ${message}`);
    return message;
  }
}
