import { Component, computed, input, output } from '@angular/core';
import { Contact } from '../../../../core/models/contact.model';
import { getInitials } from '../../../../core/utils/avatar.utils';

const MAX_VISIBLE_AVATARS = 3;

@Component({
    selector: 'app-contact-select',
    standalone: true,
    imports: [],
    templateUrl: './contact-select.html',
    styleUrl: './contact-select.scss',
})
export class ContactSelect {
    readonly contacts = input.required<Contact[]>();
    readonly selected = input.required<Contact[]>();
    readonly open = input.required<boolean>();
    readonly toggleOpen = output<MouseEvent>();
    readonly contactToggled = output<Contact>();

    protected readonly getInitials = getInitials;
    protected readonly visibleContacts = computed(() =>
        this.selected().slice(0, MAX_VISIBLE_AVATARS),
    );
    protected readonly hiddenContactsCount = computed(() =>
        Math.max(0, this.selected().length - MAX_VISIBLE_AVATARS),
    );

    protected isSelected(contact: Contact): boolean {
        return this.selected().includes(contact);
    }
}
