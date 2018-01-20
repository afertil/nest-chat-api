import {
  WebSocketGateway,
  SubscribeMessage,
  WsResponse,
  WebSocketServer,
  WsException,
  OnGatewayConnection
} from '@nestjs/websockets';
import * as WebSocket from 'ws';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/map';

import { JwtService } from '../auth/jwt/jwt.service';
import { User } from '../users/interfaces/user.interface';

@WebSocketGateway({ port: 1080, namespace: 'messages' })
export class ChatGateway implements OnGatewayConnection {
  @WebSocketServer() server;

  constructor(private jwtService: JwtService) {}

  async handleConnection(socket) {
    const user: User = await this.jwtService.verify(
      socket.handshake.query.token,
      true
    );

    socket.broadcast.emit('userConnected', user);
  }

  @SubscribeMessage('message')
  onMessage(client, data): Observable<WsResponse<string>> {
    const event = 'message';
    console.log(data);

    client.broadcast.emit('newMessage', data);

    return Observable.create(observer => observer.next({ event, data }));
  }
}
