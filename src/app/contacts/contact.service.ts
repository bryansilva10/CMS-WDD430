import { Injectable, EventEmitter } from '@angular/core';
import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  //variable for event emiter
  contactChangedEvent = new EventEmitter<Contact[]>();

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

  //method to delete a contact
  deleteContact(contact: Contact) {
    //check if an existent document was passed
    if (contact === null || contact === undefined) {
      return;
    }
    //get position of document on list
    const pos = this.contacts.indexOf(contact);

    //if there is no document (index less than 0), exit. 
    if (pos < 0) {
      return;
    }
    //removed document at specified position
    this.contacts.splice(pos, 1);
    //emit event to signal that a change has been made, and pass it a new copy of the document list
    this.contactChangedEvent.emit(this.contacts.slice());
  }
}
