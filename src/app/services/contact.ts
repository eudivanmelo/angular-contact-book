import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Contact } from '../models/contact';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private localStorageKey = 'contacts';
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  getContacts(searchTerm: string = ''): Contact[] {
    if (this.isBrowser) {
      const contactsJson = localStorage.getItem(this.localStorageKey);
      let contacts: Contact[] = contactsJson ? JSON.parse(contactsJson) : [];
      if (searchTerm) {
        contacts = contacts.filter(contact =>
          contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          contact.phone.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
      return contacts;
    }
    return [];
  }

  saveContact(contact: Contact): void {
    if (this.isBrowser) {
      let contacts = this.getContacts();
      if (contact.id) {
        contacts = contacts.map(c => c.id === contact.id ? contact : c);
      } else {
        contact.id = this.generateId();
        contacts.push(contact);
      }
      localStorage.setItem(this.localStorageKey, JSON.stringify(contacts));
    }
  }

  deleteContact(id: number): void {
    if (this.isBrowser) {
      let contacts = this.getContacts();
      contacts = contacts.filter(c => c.id !== id);
      localStorage.setItem(this.localStorageKey, JSON.stringify(contacts));
    }
  }

  private generateId(): number {
    if (this.isBrowser) {
      const contacts = this.getContacts();
      return contacts.length > 0 ? Math.max(...contacts.map(c => c.id)) + 1 : 1;
    }
    return 1;
  }
}
