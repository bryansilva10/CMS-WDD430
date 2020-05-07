import { Component, OnInit } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {
  messages: Message[] = [
    new Message('8', 'Homework', 'I need details for Homework, thanks', 'Bryan'),
    new Message('9', 'Exam', 'I need details for Exam, thanks', 'Yuri'),
    new Message('10', 'Project', 'I need details for Project, thanks', 'Guillen')
  ]

  constructor() { }

  ngOnInit(): void {
  }

  onAddMessage(message: Message) {
    //push message to array of messages
    this.messages.push(message);
  }

}
