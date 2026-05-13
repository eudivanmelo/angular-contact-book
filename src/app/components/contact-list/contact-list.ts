import { Component, EventEmitter, Output, inject } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { Contact } from '../../models/contact';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-contact-list',
  standalone: true,
  imports: [TableModule, ButtonModule, ConfirmDialogModule, ToastModule],
  templateUrl: './contact-list.html',
  styleUrl: './contact-list.scss',
  providers: [ConfirmationService, MessageService],
})
export class ContactList {
  @Output() onEdit: EventEmitter<Contact> = new EventEmitter();
  private confirmationService = inject(ConfirmationService);
  private messageService = inject(MessageService);

  contacts: Contact[] = [
    { id: 1, name: 'John Doe', email: 'john.doe@example.com', phone: '123-456-7890' },
    { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', phone: '098-765-4321' },
  ];

  editContact(contact: Contact) {
    this.onEdit.emit(contact);
  }

  deleteContact(event: Event, contact: Contact) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: `Tem certeza que deseja excluir ${contact.name}?`,
      rejectButtonProps: {
        label: 'Cancelar',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'Deletar',
        severity: 'danger',
      },
      header: 'Confirmação',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.contacts = this.contacts.filter((c) => c.id !== contact.id);
        this.messageService.add({
          severity: 'info',
          summary: 'Confirmed',
          detail: 'Contact deleted',
        });
      },
      reject: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Rejected',
          detail: 'You have rejected',
        });
      },
    });
  }
}
