import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    FormBuilder,
    FormGroup,
    ReactiveFormsModule,
    Validators,
    AbstractControl,
    ValidationErrors,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
    selector: 'app-sign-up',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, RouterLink],
    templateUrl: './sign-up.html',
    styleUrl: './sign-up.scss',
})
export class SignUp {
    private fb = inject(FormBuilder);
    private router = inject(Router);

    passwordVisible = signal(false);
    confirmPasswordVisible = signal(false);

    form: FormGroup = this.fb.group(
        {
            name: ['', [Validators.required, Validators.pattern(/^[A-Za-zÀ-ÿ]+ [A-Za-zÀ-ÿ]+$/)]],
            email: ['', [Validators.required, Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)]],
            password: ['', [Validators.required, Validators.minLength(6)]],
            confirmPassword: ['', [Validators.required]],
            privacyAccepted: [false, [Validators.requiredTrue]],
        },
        { validators: this.passwordsMatchValidator },
    );

    private passwordsMatchValidator(group: AbstractControl): ValidationErrors | null {
        const password = group.get('password')?.value;
        const confirmPassword = group.get('confirmPassword')?.value;
        return password === confirmPassword ? null : { passwordsMismatch: true };
    }

    isInvalid(fieldName: string): boolean {
        const field = this.form.get(fieldName);
        return !!field && field.invalid && (field.touched || field.dirty);
    }

    isPasswordMismatch(): boolean {
        const confirmField = this.form.get('confirmPassword');
        const touched = !!confirmField && (confirmField.touched || confirmField.dirty);
        return touched && this.form.hasError('passwordsMismatch');
    }

    togglePasswordVisibility(field: 'password' | 'confirmPassword'): void {
        if (field === 'password') {
            this.passwordVisible.update((v) => !v);
        } else {
            this.confirmPasswordVisible.update((v) => !v);
        }
    }

    getPasswordFieldType(field: 'password' | 'confirmPassword'): 'password' | 'text' {
        const visible =
            field === 'password' ? this.passwordVisible() : this.confirmPasswordVisible();
        return visible ? 'text' : 'password';
    }

    getPasswordIcon(field: 'password' | 'confirmPassword'): string {
        const hasValue = !!this.form.get(field)?.value;
        if (!hasValue) {
            return '/icons/lock.svg';
        }
        const visible =
            field === 'password' ? this.passwordVisible() : this.confirmPasswordVisible();
        return visible ? '/icons/visibility.svg' : '/icons/visibility_off.svg';
    }

    isIconClickable(field: 'password' | 'confirmPassword'): boolean {
        return !!this.form.get(field)?.value;
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

    goBack(): void {
        this.router.navigate(['/login']);
    }
}
