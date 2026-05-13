import { Component } from '@angular/core';
import { ContactSearch } from '../../components/contact-search/contact-search';
import { ContactList } from '../../components/contact-list/contact-list';
import { ContactForm } from '../../components/contact-form/contact-form';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { Contact } from '../../models/contact';

@Component({
  selector: 'app-contacts-page',
  standalone: true,
  imports: [ContactSearch, ContactList, ContactForm, ButtonModule, DialogModule],
  templateUrl: './contacts-page.html',
  styleUrl: './contacts-page.scss'
})
export class ContactsPage {
  contactDialog: boolean = false;
  contact: Contact = {} as Contact;

  openNew() {
    this.contact = {} as Contact;
    this.contactDialog = true;
  }

  editContact(contact: Contact) {
    this.contact = { ...contact };
    this.contactDialog = true;
  }

  hideDialog() {
    this.contactDialog = false;
  }
}
