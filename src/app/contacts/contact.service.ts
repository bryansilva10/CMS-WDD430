import { Injectable, EventEmitter } from '@angular/core';
import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  // //variable for event emiter
  contactChangedEvent = new EventEmitter<Contact[]>();

  //subject property
  contactListChangedEvent = new Subject<Contact[]>();

  //property to hold max id
  maxContactId: number;

  contacts: Contact[] = [];

  //inject http client
  constructor(private http: HttpClient) {
    //init contact to be the ones coming from mockcontaccts
    // this.contacts = MOCKCONTACTS;
    this.getContacts();
    //get the max id at init time
    this.maxContactId = this.getMaxId();
  }

  //method to get all contaccts
  getContacts() {
    //use http get
    this.http.get('https://cms-app-d5fce.firebaseio.com/contacts.json')
      //subscribe to observable returning
      .subscribe(
        //sucess function
        (contacts: Contact[]) => {
          //assign the array of contacts received to the contacts class attribute
          this.contacts = contacts;
          // get the maximum value used for the id property in the contacts list
          this.maxContactId = this.getMaxId();
          //sort alphabetically by name
          this.contacts.sort((a, b) => (a.name < b.name) ? 1 : (a.name > b.name) ? -1 : 0)
          //signal that the list has changed
          this.contactListChangedEvent.next(this.contacts.slice());
        },
        (error: any) => {
          console.log(error);
        }
      )
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

  //method to get max id number in contact list
  getMaxId(): number {
    //variable to hold max Id
    let maxId = 0;
    //loop through the contact list
    for (const contact of this.contacts) {
      //get current id as a number
      const currentId = +contact.id;
      //if the current id is greater than max ID...
      if (currentId > maxId) {
        //then max id is the current id
        maxId = currentId;
      }
    }
    //return that max id
    return maxId;
  }

  //method to add a contact when user press add button
  addContact(newContact: Contact) {
    //if null or undef...
    if (newContact === null || newContact === undefined) {
      //exit function
      return;
    }

    //if contact exists..
    //increment id number and assign to new contact (as string)
    this.maxContactId++;
    newContact.id = this.maxContactId.toString();
    //push unto list
    this.contacts.push(newContact);
    //store/modify contacts on firebase database
    this.storeContacts();
  }

  //method to update/replace an existing contact
  updateContact(originalContact: Contact, newContact: Contact) {
    //check if contact exists...
    if (originalContact === null || originalContact === undefined || newContact === null || newContact === undefined) {
      //if not, exit function
      return;
    }

    //find position/index of original cntact
    const pos = this.contacts.indexOf(originalContact);
    //if the position is less than 0 (meaning it is not in the list)...
    if (pos < 0) {
      //exit
      return;
    }

    //set the id of new contact to be tht of the original
    newContact.id = originalContact.id;
    //set the contact in the list to be the new contact
    this.contacts[pos] = newContact;
    //store/modify contacts on firebase database
    this.storeContacts();
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
    //store/modify contacts on firebase database
    this.storeContacts();
  }

  //method to store contacts in database with put request
  storeContacts() {
    //stringify the list of documnts
    let contacts = JSON.stringify(this.contacts);

    //create header for content type
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    //put method with url, contacts object to replace, and headers
    this.http.put('https://cms-app-d5fce.firebaseio.com/contacts.json', contacts, { headers: headers })
      //subscribe to response
      .subscribe(
        () => {
          //once a response has been received, signal that the document list has changed, send copy of list
          this.contactListChangedEvent.next(this.contacts.slice());
        }
      )
  }
}
