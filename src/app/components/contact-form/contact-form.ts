import { ChangeDetectionStrategy, Component, effect, inject, input, output, signal } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { FormsModule } from '@angular/forms';
import { ContactService } from '../../services/contact';
import { Contact } from '../../models/contact';

@Component({
  selector: 'app-contact-form',
  imports: [InputTextModule, ButtonModule, FormsModule, FloatLabelModule],
  templateUrl: './contact-form.html',
  styleUrl: './contact-form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactForm {
  readonly contact = input.required<Contact>();
  readonly saved = output<void>();
  private readonly contactService = inject(ContactService);
  protected readonly name = signal('');
  protected readonly email = signal('');
  protected readonly phone = signal('');
  protected readonly isEditing = signal(false);

  constructor() {
    effect(() => {
      const contact = this.contact();
      this.name.set(contact.name ?? '');
      this.email.set(contact.email ?? '');
      this.phone.set(contact.phone ?? '');
      this.isEditing.set(!!contact.id);
    });
  }

  saveContact() {
    this.contactService.saveContact({
      ...this.contact(),
      name: this.name().trim(),
      email: this.email().trim(),
      phone: this.phone().trim(),
    });
    this.saved.emit();
  }
}
