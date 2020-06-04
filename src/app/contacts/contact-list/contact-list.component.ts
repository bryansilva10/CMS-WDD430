import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit, OnDestroy {

  //list of contacts
  contacts: Contact[] = []

  //subscription property
  private subscription: Subscription;

  //inject contact service
  constructor(private contactService: ContactService) {

  }

  ngOnInit(): void {
    this.contacts = this.contactService.getContacts();
    this.subscription = this.contactService.contactListChangedEvent
      .subscribe((contacts: Contact[]) => {
        this.contacts = contacts;
      });
  }

  // //method to emit event
  // onSelected(contact: Contact) {
  //   //emit event passing the contact as data
  //   this.contactService.contactSelectedEvent.emit(contact);
  // }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
