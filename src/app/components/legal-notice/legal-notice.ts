import { Component } from '@angular/core';
import { IMPRINT } from '../../core/constants/imprint';

@Component({
    selector: 'app-legal-notice',
    standalone: true,
    imports: [],
    templateUrl: './legal-notice.html',
    styleUrl: './legal-notice.scss',
})
export class LegalNotice {
    protected readonly imprint = IMPRINT;
}
