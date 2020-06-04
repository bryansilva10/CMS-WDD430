import { Injectable, EventEmitter } from '@angular/core';
import { Document } from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocumentsService {
  documents: Document[];
  // //event emiter for changes in the document
  // documentChangedEvent = new EventEmitter<Document[]>();

  //property for max id
  maxDocumentId: number;

  //subject property
  documentListChangedEvent = new Subject<Document[]>();

  constructor() {
    //init documents to be the ones coming from mock
    this.documents = MOCKDOCUMENTS;
    //get the max id at init time
    this.maxDocumentId = this.getMaxId();
  }

  //method to get all documents
  getDocuments(): Document[] {
    //return a copy of the array of documents
    return this.documents.slice();
  }

  //method to get a single specific document
  getDocument(id: string): Document {
    for (const document of this.documents) {
      if (document.id === id) {
        return document;
      }
    }
    return null;
  }

  //method to get max id number in document list
  getMaxId(): number {
    //variable to hold max Id
    let maxId = 0;
    //loop through the document list
    for (const document of this.documents) {
      //get current id as a number
      const currentId = +document.id;
      //if the current id is greater than max ID...
      if (currentId > maxId) {
        //then max id is the current id
        maxId = currentId;
      }
    }
    //return that max id
    return maxId;
  }

  //method to add a document when user press add button
  addDocument(newDocument: Document) {
    //if null or undef...
    if (newDocument === null || newDocument === undefined) {
      //exit function
      return;
    }

    //if document exists..
    //increment id number and assign to new document (as string)
    this.maxDocumentId++;
    newDocument.id = this.maxDocumentId.toString();
    //push unto list
    this.documents.push(newDocument);
    //create copy of list and emit/signal a change passing the copy
    const documentListClone = this.documents.slice();
    this.documentListChangedEvent.next(documentListClone);
  }

  //method to update/replace an existing document
  updateDocument(originalDocument: Document, newDocument: Document) {
    //check if document exists...
    if (originalDocument === null || originalDocument === undefined || newDocument === null || newDocument === undefined) {
      //if not, exit function
      return;
    }

    //find position/index of original document
    const pos = this.documents.indexOf(originalDocument);
    //if the position is less than 0 (meaning it is not in the list)...
    if (pos < 0) {
      //exit
      return;
    }

    //set the id of new document to be tht of the original
    newDocument.id = originalDocument.id;
    //set the document in the list to be the new document
    document[pos] = newDocument;
    //create copy
    const documentListClone = this.documents.slice();
    //emit/signal a change passing the copy
    this.documentListChangedEvent.next(documentListClone);
  }

  deleteDocument(document: Document) {
    //check if an existent document was passed
    if (document === null || document === undefined) {
      return;
    }
    //get position of document on list
    const pos = this.documents.indexOf(document);

    //if there is no document (index less than 0), exit. 
    if (pos < 0) {
      return;
    }
    //removed document at specified position
    this.documents.splice(pos, 1);
    //emit event to signal that a change has been made, and pass it a new copy of the document list
    this.documentListChangedEvent.next(this.documents.slice());
  }
}
