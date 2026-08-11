import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Contact } from '../../../core/models/contact';
import { getAvatarColor } from '../../../core/utils/avatar-color.util';

@Component({
  selector: 'app-contact-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contact-list.html',
  styleUrl: './contact-list.scss',
})
export class ContactList {
  contacts = signal<Contact[]>([
    { id: '1', name: 'Anton Mayer', email: 'anton@gmail.com', phone: '+49 111', avatarColor: '' },
    { id: '2', name: 'Anja Schulz', email: 'anja@gmail.com', phone: '+49 222', avatarColor: '' },
    { id: '3', name: 'Tatjana Wolf', email: 'wolf@gmail.com', phone: '+49 333', avatarColor: '' },
  ]);

  groupedContacts = computed(() => {
    const sorted = [...this.contacts()].sort((a, b) => a.name.localeCompare(b.name));
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
