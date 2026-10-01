import { Component, input, output } from '@angular/core';

@Component({
    selector: 'app-category-select',
    standalone: true,
    imports: [],
    templateUrl: './category-select.html',
    styleUrl: './category-select.scss',
})
export class CategorySelect {
    readonly categories = input.required<string[]>();
    readonly value = input.required<string>();
    readonly open = input.required<boolean>();
    readonly invalid = input(false);
    readonly toggleOpen = output<MouseEvent>();
    readonly categorySelected = output<string>();
}
