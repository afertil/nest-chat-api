import {
  WebSocketGateway,
  SubscribeMessage,
  WsResponse,
  WebSocketServer,
  WsException,
  OnGatewayConnection,
  OnGatewayDisconnect
} from '@nestjs/websockets';
import * as WebSocket from 'ws';
import * as io from 'socket.io';
import { Observable } from 'rxjs';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/map';

import { JwtService } from '../auth/jwt/jwt.service';
import { User } from '../users/interfaces/user.interface';
import { RoomsService } from '../rooms/rooms.service';

@WebSocketGateway({ port: 1080, namespace: 'rooms' })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server;

  connectedUsers: string[] = [];

  constructor(
    private jwtService: JwtService,
    private roomService: RoomsService
  ) { }

  async handleConnection(socket) {
    console.log(socket);
    const roomId = socket.handshake.query.room;
    console.log('room id', roomId);
    const user: User = await this.jwtService.verify(
      socket.handshake.query.token,
      true
    );

    socket.join(roomId);

    this.connectedUsers = [... this.connectedUsers, String(user._id)];

    const messages = await this.roomService.findMessages(roomId, 25);

    // Send last messages to the connected user
    socket.emit('message', messages);

    // socket.broadcast.emit('userConnected', user);
  }

  async handleDisconnect(socket) {
    const roomId = socket.handshake.query.room;
    const user: User = await this.jwtService.verify(
      socket.handshake.query.token,
      true
    );
    const userPos = this.connectedUsers.indexOf(String(user._id));

    socket.leave(roomId);
    if (userPos > -1) {
      this.connectedUsers = [...this.connectedUsers.slice(0, userPos), ...this.connectedUsers.slice(userPos + 1)]
    }
  }

  @SubscribeMessage('message')
  onMessage(client, data): Observable<WsResponse<string>> {
    const room = client.handshake.query.room;
    const event = 'message';

    client.broadcast.to(room).emit('message', data);

    this.roomService.addMessage(data, room);

    return Observable.create(observer => observer.next({ event, data }));
  }

  @SubscribeMessage('join')
  onRoomConnection(client, data): void {
    const room = client.handshake.query.room;
    console.log('join', room);
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
