import { Component, OnInit } from '@angular/core';
import { Contact } from '../contact.model';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
  contacts: Contact[] = [
    new Contact('1', 'Elder Holland', 'notTheRealHolland@blds.com', '208-496-3771', 'https://www.churchofjesuschrist.org/bc/content/shared/content/images/leaders/jeffrey-r-holland-large.jpg', null),
    new Contact('2', 'President Eyring', 'notTheRealEyring@lds.com', '208-496-3768', 'https://www.churchofjesuschrist.org/bc/content/shared/content/images/leaders/henry-b-eyring-large.jpg', null)
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
