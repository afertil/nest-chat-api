import {
  WebSocketGateway,
  SubscribeMessage,
  WsResponse,
  WebSocketServer,
  WsException,
  OnGatewayConnection,
} from '@nestjs/websockets';
import * as WebSocket from 'ws';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/map';

import { JwtService } from '../auth/jwt/jwt.service';
import { User } from '../users/interfaces/user.interface';

@WebSocketGateway({ port: 1080, namespace: 'rooms' })
export class ChatGateway implements OnGatewayConnection {
  @WebSocketServer() server;

  constructor(private jwtService: JwtService) {}

  async handleConnection(socket) {
    const user: User = await this.jwtService.verify(
      socket.handshake.query.token,
      true,
    );

    console.log(socket.handshake.query.room);
    socket.join(socket.handshake.query.room);

    socket.broadcast.emit('userConnected', user);
  }

  @SubscribeMessage('message')
  onMessage(client, data): Observable<WsResponse<string>> {
    const event = 'message';
    console.log(data);

    client.broadcast.emit('newMessage', data);

    return Observable.create(observer => observer.next({ event, data }));
  }

  @SubscribeMessage('messages/join/:id')
  onRoomConnection(client, data): void {
    const room = client.handshake.query.room;

    client.join(room);
  }

  @SubscribeMessage('messages/leave/:id')
  onRoomLeave(client, data): void {
    const room = client.handshake.query.room;

    client.leave(room);
  }

  @SubscribeMessage('messages/:id')
  onMessageRoom(client, data): Observable<WsResponse<string>> {
    const room = client.handshake.query.room;
    const event = `message/${client.room.id}`;
    console.log(data);

    client.to(room).emit(data);

    return Observable.create(observer => observer.next({ event, data }));
  }
}
