import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { ContactsPage } from "./pages/contacts-page/contacts-page";

@Component({
  selector: 'app-root',
  imports: [ContactsPage],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {

}
