import { Component, Input } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { Contact } from '../../models/contact';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [InputTextModule, ButtonModule, FormsModule, FloatLabelModule],
  templateUrl: './contact-form.html',
  styleUrl: './contact-form.scss'
})
export class ContactForm {
  @Input() contact: Contact = {} as Contact;

  onSubmit() {
    // Handle form submission logic here
    console.log('Form submitted:', { name: this.contact.name, email: this.contact.email, phone: this.contact.phone });
  }
}
