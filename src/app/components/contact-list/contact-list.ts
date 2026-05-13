import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  computed,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { TitleCasePipe } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { Contact } from '../../models/contact';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { ContactService } from '../../services/contact';
import { ContactInitialsPipe } from '../../pipes/contact-initials-pipe-pipe';

@Component({
  selector: 'app-contact-list',
  standalone: true,
  imports: [ButtonModule, ConfirmDialogModule, ToastModule, ContactInitialsPipe, TitleCasePipe],
  templateUrl: './contact-list.html',
  styleUrl: './contact-list.scss',
  providers: [ConfirmationService, MessageService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactList implements OnInit {
  readonly searchTerm = input('');
  readonly edit = output<Contact>();
  readonly deleted = output<void>();
  private readonly confirmationService = inject(ConfirmationService);
  private readonly messageService = inject(MessageService);
  private readonly contactService = inject(ContactService);

  protected readonly contacts = signal<Contact[]>([]);
  protected readonly hasContacts = computed(() => this.contacts().length > 0);
  protected readonly hasSearchTerm = computed(() => this.searchTerm().trim().length > 0);
  protected readonly emptyMessage = computed(() =>
    this.hasSearchTerm()
      ? `Nenhum contato encontrado para “${this.searchTerm()}”.`
      : 'Ainda não há contatos cadastrados.',
  );

  ngOnInit(): void {
    this.loadContacts();
  }

  loadContacts(searchTerm: string = ''): void {
    this.contacts.set(this.contactService.getContacts(searchTerm));
  }

  editContact(contact: Contact) {
    this.edit.emit(contact);
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
        this.contactService.deleteContact(contact.id);
        this.loadContacts(this.searchTerm());
        this.deleted.emit();
        this.messageService.add({
          severity: 'success',
          summary: 'Confirmado',
          detail: 'Contato deletado com sucesso!',
        });
      },
    });
  }
}
