import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ContactsPage } from "./pages/contacts-page/contacts-page";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ContactsPage],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('angular-contact-book');
}
