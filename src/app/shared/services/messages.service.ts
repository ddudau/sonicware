import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Message } from "../models/message.model";
import { environment } from "src/environments/environment";

@Injectable()
export class MessagesService {
  messagesURL = `${environment.apiBase}messages`;

  constructor(private http: HttpClient) {}
  
  createMessage(message: Message) {
    return this.http.post<Message>(this.messagesURL, message);
  }

  listMessages() {
    return this.http.get<Message[]>(this.messagesURL);
  }
}