import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, RouterLink],
    templateUrl: './login.html',
    styleUrl: './login.scss',
})
export class Login implements OnInit {
    private fb = inject(FormBuilder);
    private router = inject(Router);
    private authService = inject(AuthService);
    errorMessage = signal('');
    showSplash = signal(true);
    logoInPlace = signal(false);
    showCard = signal(false);

    form: FormGroup = this.fb.group({
        email: ['', [Validators.required, Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)]],
        password: ['', [Validators.required]],
    });

    ngOnInit(): void {
        setTimeout(() => this.logoInPlace.set(true), 600);
        setTimeout(() => {
            this.showSplash.set(false);
            this.showCard.set(true);
        }, 1100);
    }

    isInvalid(fieldName: string): boolean {
        const field = this.form.get(fieldName);
        return !!field && field.invalid && (field.touched || field.dirty);
    }

    private markAllTouched(): void {
        this.form.markAllAsTouched();
    }

    async onSubmit(): Promise<void> {
        this.errorMessage.set('');

        if (this.form.invalid) {
            this.markAllTouched();

            return;
        }

        const { email, password } = this.form.getRawValue();

        const error = await this.authService.login(email, password);

        if (error) {
            this.errorMessage.set('Incorrect email or password.');

            return;
        }

        this.router.navigate(['/summary']);
    }
    async onGuestLogin(): Promise<void> {
        this.errorMessage.set('');

        const error = await this.authService.loginAsGuest();

        if (error) {
            this.errorMessage.set('Guest login failed.');

            return;
        }

        this.router.navigate(['/summary']);
    }
}
