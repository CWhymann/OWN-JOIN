import { Component, input, output } from '@angular/core';

@Component({
    selector: 'app-priority-select',
    standalone: true,
    imports: [],
    templateUrl: './priority-select.html',
    styleUrl: './priority-select.scss',
})
export class PrioritySelect {
    readonly value = input.required<string>();
    readonly priorityChange = output<string>();

    protected readonly priorities = [
        { value: 'urgent', label: 'Urgent' },
        { value: 'medium', label: 'Medium' },
        { value: 'low', label: 'Low' },
    ];
}
