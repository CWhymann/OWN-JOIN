import { Component, input, output } from '@angular/core';

@Component({
    selector: 'app-board-header',
    standalone: true,
    imports: [],
    templateUrl: './board-header.html',
    styleUrl: './board-header.scss',
})
export class BoardHeader {
    readonly searchTerm = input.required<string>();
    readonly searchInput = output<Event>();
    readonly searchCleared = output<void>();
    readonly addTaskClicked = output<void>();
}
