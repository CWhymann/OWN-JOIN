import { Component } from '@angular/core';
import { IMPRINT } from '../../core/constants/imprint';

@Component({
    selector: 'app-privacy-policy',
    standalone: true,
    imports: [],
    templateUrl: './privacy-policy.html',
    styleUrl: './privacy-policy.scss',
})
export class PrivacyPolicy {
    protected readonly imprint = IMPRINT;
}
