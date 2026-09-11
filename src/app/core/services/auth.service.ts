import { computed, inject, Injectable, signal } from '@angular/core';

import { User } from '@supabase/supabase-js';

import { SupabaseService } from './supabase.service';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private readonly supabaseService = inject(SupabaseService);

    private readonly userSignal = signal<User | null>(null);

    readonly user = this.userSignal.asReadonly();

    readonly isLoggedIn = computed(() => this.userSignal() !== null);

    readonly isGuest = computed(() => this.userSignal()?.email === 'guest@ownjoin.de');

    readonly userName = computed(() => this.readName(this.userSignal()));

    readonly initials = computed(() => this.createInitials(this.userName()));

    /**
     * Reads the stored Supabase session and restores the current user.
     */
    async restoreSession(): Promise<void> {
        const { data } = await this.supabaseService.client.auth.getSession();

        this.userSignal.set(data.session?.user ?? null);
    }

    /**
     * Signs a user in with email and password.
     */
    async login(email: string, password: string): Promise<string | null> {
        const { data, error } = await this.supabaseService.client.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            return error.message;
        }

        this.userSignal.set(data.user);

        return null;
    }

    /**
     * Signs in with the shared guest account.
     */
    async loginAsGuest(): Promise<string | null> {
        return this.login('guest@ownjoin.de', 'PRIVATE');
    }

    /**
     * Registers a new user.
     */
    async signUp(email: string, password: string, name: string): Promise<string | null> {
        const { data, error } = await this.supabaseService.client.auth.signUp({
            email,
            password,
            options: {
                data: {
                    name,
                },
            },
        });

        if (error) {
            return error.message;
        }

        this.userSignal.set(data.user);

        return null;
    }

    /**
     * Updates the user's display name.
     */
    async updateName(name: string): Promise<void> {
        const { data } = await this.supabaseService.client.auth.updateUser({
            data: {
                name,
            },
        });

        if (data.user) {
            this.userSignal.set(data.user);
        }
    }

    /**
     * Signs the user out and clears the current user.
     */
    async logout(): Promise<void> {
        await this.supabaseService.client.auth.signOut();

        this.userSignal.set(null);
    }

    /**
     * Reads the user's display name from Supabase metadata.
     */
    private readName(user: User | null): string {
        if (!user) {
            return '';
        }

        if (user.email === 'guest@ownjoin.de') {
            return 'Guest';
        }

        return (user.user_metadata['name'] as string | undefined) ?? '';
    }

    /**
     * Creates initials from the user's name.
     */
    private createInitials(name: string): string {
        const parts = name.trim().split(/\s+/);

        return parts
            .slice(0, 2)
            .map((part) => part.charAt(0).toUpperCase())
            .join('');
    }
}
