import { Component, input, output } from '@angular/core';

@Component({
    selector: 'app-form-actions',
    standalone: true,
    imports: [],
    templateUrl: './form-actions.html',
    styleUrl: './form-actions.scss',
})
export class FormActions {
    readonly editing = input(false);
    readonly disabled = input(false);
    readonly cleared = output<void>();
}
