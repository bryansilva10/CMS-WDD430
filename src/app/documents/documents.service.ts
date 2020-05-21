import { Injectable } from '@angular/core';
import { Document } from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';

@Injectable({
  providedIn: 'root'
})
export class DocumentsService {
  documents: Document[];

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
  getdocument(id: String): Document {
    //loop through all the documents
    this.documents.forEach(document => {
      //if ids match
      if (document.id === id) {
        return document;
      }
    })
    //if no id is found...
    return null;
  }
}
