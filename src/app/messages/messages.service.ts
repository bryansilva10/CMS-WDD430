import { Injectable, EventEmitter } from '@angular/core';
import { Message } from './message.model';
import { MOCKMESSAGES } from './MOCKMESSAGES';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  //event emiter
  // messageChangeEvent = new EventEmitter<Message[]>();
  messageListChangedEvent = new Subject<Message[]>();
  //variable for array of messages
  messages: Message[] = [];

  maxMessageId: number;

  //inject http client
  constructor(private http: HttpClient) {
    this.getMessages();

  }

  //method to get all messages
  getMessages() {
    //use http get
    this.http.get('https://cms-app-d5fce.firebaseio.com/messages.json')
      //subscribe to observable returning
      .subscribe(
        //sucess function
        (messages: Message[]) => {
          //assign the array of contacts received to the contacts class attribute
          this.messages = messages;
          // get the maximum value used for the id property in the contacts list
          this.maxMessageId = this.getMaxId();
          //sort alphabetically by name
          this.messages.sort((a, b) => (a.id < b.id) ? 1 : (a.id > b.id) ? -1 : 0)
          //signal that the list has changed
          this.messageListChangedEvent.next(this.messages.slice());
        },
        (error: any) => {
          console.log(error);
        }
      )
  }

  //method to get a single specific message
  getMessage(id: string): Message {
    //loop through all the messages
    for (const message of this.messages) {
      if (message.id === id) {
        return message;
      }
    }
    return null;
  }

  //method to get max id number in contact list
  getMaxId(): number {
    //variable to hold max Id
    let maxId = 0;
    //loop through the message list
    for (const message of this.messages) {
      //get current id as a number
      const currentId = +message.id;
      //if the current id is greater than max ID...
      if (currentId > maxId) {
        //then max id is the current id
        maxId = currentId;
      }
    }
    //return that max id
    return maxId;
  }

  //method to add a message
  addMessage(message: Message) {
    this.messages.push(message);
    this.storeMessages();
  }

  //method to store messages in database with put request
  storeMessages() {
    //stringify the list of documnts
    let messages = JSON.stringify(this.messages);

    //create header for content type
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    //put method with url, messages object to replace, and headers
    this.http.put('https://cms-app-d5fce.firebaseio.com/messages.json', messages, { headers: headers })
      //subscribe to response
      .subscribe(
        () => {
          //once a response has been received, signal that the document list has changed, send copy of list
          this.messageListChangedEvent.next(this.messages.slice());
        }
      )
  }
}

