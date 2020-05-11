import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Document } from '../document.model';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {
  //event emitter
  @Output() selectedDocumentEvent = new EventEmitter<Document>();

  //array/list of dummy documents
  documents: Document[] = [
    new Document('1', 'JavaScript', 'Used mostly for Web Development', 'https://www.w3schools.com/whatis/whatis_js.asp', null),
    new Document('2', 'CSS', 'Used mostly for styling documents', 'https://www.w3schools.com/whatis/whatis_css.asp', null),
    new Document('3', 'Typescript', 'A subset of JavaScript that is strongly typed', 'https://www.typescriptlang.org/', null),
    new Document('4', 'Angular', 'An MVC Framework for Front End Development', 'https://angular.io/', null)
  ]

  constructor() { }

  ngOnInit(): void {
  }

  onSelectedDocument(document: Document) {
    this.selectedDocumentEvent.emit(document);
  }

}
