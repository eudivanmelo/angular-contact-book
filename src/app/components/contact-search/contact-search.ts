import { ChangeDetectionStrategy, Component, output, signal } from '@angular/core';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact-search',
  templateUrl: './contact-search.html',
  styleUrl: './contact-search.scss',
  imports: [IconFieldModule, InputIconModule, InputTextModule, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactSearch {
  readonly search = output<string>();
  protected readonly searchTerm = signal('');

  onSearchChange(): void {
    this.search.emit(this.searchTerm());
  }
}
