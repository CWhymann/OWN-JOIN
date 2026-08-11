import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactsService } from '../../../core/services/contacts.service';
import { getAvatarColor } from '../../../core/utils/avatar-color.util';

@Component({
  selector: 'app-contact-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contact-detail.html',
  styleUrl: './contact-detail.scss',
})
export class ContactDetail {
  private contactsService = inject(ContactsService);

  contact = this.contactsService.selectedContact;

  getInitials(name: string): string {
    return name
      .split(' ')
      .map((part) => part.charAt(0))
      .join('')
      .toUpperCase();
  }

  getColor(name: string): string {
    return getAvatarColor(name);
  }
}
