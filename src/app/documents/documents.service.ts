import { Injectable, EventEmitter } from '@angular/core';
import { Document } from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';

@Injectable({
  providedIn: 'root'
})
export class DocumentsService {
  documents: Document[];
  //event emiter for changes in the document
  documentChangedEvent = new EventEmitter<Document[]>();

  constructor() {
    //init documents to be the ones coming from mock
    this.documents = MOCKDOCUMENTS;
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
    this.documentChangedEvent.emit(this.documents.slice());
  }
}
