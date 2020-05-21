import { Injectable, EventEmitter } from '@angular/core';
import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  //variable for event emiter
  contactSelectedEvent = new EventEmitter<Contact>();

  contacts: Contact[];

  constructor() {
    //init contact to be the ones coming from mockcontaccts
    this.contacts = MOCKCONTACTS;
  }

  //method to get all contaccts
  getContacts(): Contact[] {
    //return a copy of the array of contacts
    return this.contacts.slice();
  }

  //method to get a single specific contact
  getContact(id: string): Contact {
    // //loop through all the contacts
    // this.contacts.forEach(contact => {
    //   //if ids match
    //   if (contact.id === id) {
    //     return contact;
    //   }
    // })
    // //if no id is found...
    // return null;

    for (const contact of this.contacts) {
      if (contact.id === id) {
        return contact;
      }
    }
    return null;
  }
}
