import { Location } from '@angular/common';
import { Component, inject } from '@angular/core';
import { IMPRINT } from '../../core/constants/imprint';

@Component({
    selector: 'app-help',
    standalone: true,
    imports: [],
    templateUrl: './help.html',
    styleUrl: './help.scss',
})
export class Help {
    private readonly location = inject(Location);

    protected readonly contactEmail = IMPRINT.email;

    protected goBack(): void {
        this.location.back();
    }
}
