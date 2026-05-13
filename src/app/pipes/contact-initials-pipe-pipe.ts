import { Pipe, PipeTransform } from '@angular/core';
import { Contact } from '../models/contact';

@Pipe({
  name: 'contactInitials',
  standalone: true,
})
export class ContactInitialsPipe implements PipeTransform {
  transform(contact: Contact | null | undefined): string {
    const source = contact?.name?.trim() ?? '';

    if (!source) {
      return '--';
    }

    const initials = source
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map(part => part[0]?.toUpperCase() ?? '')
      .join('');

    return initials || '--';
  }
}
