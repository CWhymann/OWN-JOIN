import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Contact } from '../../../core/models/contact';
import { getAvatarColor } from '../../../core/utils/avatar-color.util';
import { ContactsService } from '../../../core/services/contacts.service';

@Component({
  selector: 'app-contact-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contact-list.html',
  styleUrl: './contact-list.scss',
})
export class ContactList {
  private contactsService = inject(ContactsService);

  groupedContacts = computed(() => {
    const sorted = [...this.contactsService.contacts()].sort((a, b) =>
      a.name.localeCompare(b.name),
    );
    const groups = new Map<string, Contact[]>();

    for (const contact of sorted) {
      const letter = contact.name.charAt(0).toUpperCase();
      if (!groups.has(letter)) {
        groups.set(letter, []);
      }
      groups.get(letter)!.push(contact);
    }

    return groups;
  });

  selectedId = computed(() => this.contactsService.selectedContact()?.id);

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

  onSelect(contact: Contact): void {
    this.contactsService.selectContact(contact);
  }
}
