import { ChangeDetectionStrategy, Component, ViewChild, computed, signal } from '@angular/core';
import { ContactSearch } from '../../components/contact-search/contact-search';
import { ContactList } from '../../components/contact-list/contact-list';
import { ContactForm } from '../../components/contact-form/contact-form';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { Contact } from '../../models/contact';

@Component({
  selector: 'app-contacts-page',
  imports: [ContactSearch, ContactList, ContactForm, ButtonModule, DialogModule],
  templateUrl: './contacts-page.html',
  styleUrl: './contacts-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactsPage {
  @ViewChild(ContactList) contactList!: ContactList;
  protected readonly contactDialog = signal(false);
  protected readonly contact = signal<Contact>({} as Contact);
  protected readonly searchTerm = signal('');
  protected readonly dialogTitle = computed(() => this.contact().id ? 'Editar contato' : 'Novo contato');

  openNew() {
    this.contact.set({} as Contact);
    this.contactDialog.set(true);
  }

  editContact(contact: Contact) {
    this.contact.set({ ...contact });
    this.contactDialog.set(true);
  }

  hideDialog() {
    this.contactDialog.set(false);
  }

  onContactSaved() {
    this.contactList.loadContacts(this.searchTerm());
    this.hideDialog();
  }

  onContactDeleted() {
    this.contactList.loadContacts(this.searchTerm());
  }

  onSearch(searchTerm: string) {
    this.searchTerm.set(searchTerm);
    this.contactList.loadContacts(searchTerm);
  }
}
