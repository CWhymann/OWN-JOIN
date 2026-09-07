import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

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

    onSubmit(): void {
        if (this.form.invalid) {
            this.markAllTouched();
            return;
        }
    }

    onGuestLogin(): void {
        this.router.navigate(['/summary']);
    }
}
