import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private socket: Socket;
  private readonly uri: string = 'http://localhost:3000'; 

  constructor() {
    this.socket = io(this.uri, {
      auth: {
        token: localStorage.getItem('token')
      }
    });
  }

  sendMessage(message: string) {
    this.socket.emit('message', message);
  }

  receiveMessages(): Observable<string> {
    return new Observable(observer => {
      this.socket.on('message', (msg: string) => {
        observer.next(msg);
      });

      return () => {
        this.socket.off('message');
      };
    });
  }

}
