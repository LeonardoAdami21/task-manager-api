import { Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class NotificationsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private readonly jwtService: JwtService) {}
  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('NotificationGateway');
  afterInit(server: Server) {
    this.logger.log('Initialized');
  }

  handleConnection(client: any, ...args: any[]) {
    try {
      const token = client.handshake.headers.authorization?.split(' ')[1];
      const payload = this.jwtService.verify(token);
      client.user = payload;
      this.logger.log(`Client connected: ${client.id}`);
    } catch (error) {
      this.logger.error('Invalid token');
      client.disconnect();
    }
  }
  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('notification')
  handleNotification(
    @MessageBody() data: any,
    @ConnectedSocket() client: Socket,
  ): void {
    const user = client.data.user;
    this.logger.log(`Received notification: ${data.message}`);
    this.server.to(user.id).emit('notification', {
      message: data.message,
    });
  }
}
