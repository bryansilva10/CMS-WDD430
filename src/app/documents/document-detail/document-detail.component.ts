import { Component, OnInit, Input } from '@angular/core';
import { Document } from '../document.model';

@Component({
  selector: 'app-document-detail',
  templateUrl: './document-detail.component.html',
  styleUrls: ['./document-detail.component.css']
})
export class DocumentDetailComponent implements OnInit {
  //document coming as input
  @Input() document: Document;

  constructor() { }

  ngOnInit(): void {
  }

}
