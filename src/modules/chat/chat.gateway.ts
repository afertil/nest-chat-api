import {
  WebSocketGateway,
  SubscribeMessage,
  WsResponse,
  WebSocketServer,
  WsException,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import * as WebSocket from 'ws';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/map';

import { JwtService } from '../auth/jwt/jwt.service';
import { User } from '../users/interfaces/user.interface';

@WebSocketGateway({ port: 1080, namespace: 'rooms' })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server;

  constructor(private jwtService: JwtService) {}

  async handleConnection(socket) {
    const user: User = await this.jwtService.verify(
      socket.handshake.query.token,
      true,
    );

    socket.join(socket.handshake.query.room);

    socket.broadcast.emit('userConnected', user);
  }

  async handleDisconnect(socket) {
    const room = socket.handshake.query.room;
    socket.leave(room);
  }

  @SubscribeMessage('message')
  onMessage(client, data): Observable<WsResponse<string>> {
    const room = client.handshake.query.room;
    const event = 'message';

    client.broadcast.to(room).emit('message', data);

    return Observable.create(observer => observer.next({ event, data }));
  }

  @SubscribeMessage('join')
  onRoomConnection(client, data): void {
    const room = client.handshake.query.room;

    client.join(room);
  }

  @SubscribeMessage('leave')
  onRoomLeave(client, data): void {
    const room = client.handshake.query.room;
console.log('leave', room);
    client.leave(room);
  }

  @SubscribeMessage('messages')
  onMessageRoom(client, data): Observable<WsResponse<string>> {
    const room = client.handshake.query.room;
    const event = `message/${client.room.id}`;
    console.log(data);
    console.log('--------');
    console.log('Room', room);
    client.to(room).emit(data);

    return Observable.create(observer => observer.next({ event, data }));
  }
}
