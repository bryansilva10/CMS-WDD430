import { Injectable, EventEmitter } from '@angular/core';
import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';
import { Subject } from 'rxjs';

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

	contacts: Contact[];

	constructor() {
		//init contact to be the ones coming from mockcontaccts
		this.contacts = MOCKCONTACTS;
		//get the max id at init time
		this.maxContactId = this.getMaxId();
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
		//create copy of list and emit/signal a change passing the copy
		const contactListClone = this.contacts.slice();
		this.contactListChangedEvent.next(contactListClone);
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
		//create copy
		const contactListClone = this.contacts.slice();
		//emit/signal a change passing the copy
		this.contactListChangedEvent.next(contactListClone);
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
		this.contactListChangedEvent.next(this.contacts.slice());
	}
}
