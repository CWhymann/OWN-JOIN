import { inject } from '@angular/core';

import { Router } from '@angular/router';

import { SupabaseService } from '../services/supabase.service';

export const authGuard = async (): Promise<boolean> => {
    const supabaseService = inject(SupabaseService);

    const router = inject(Router);

    const { data } = await supabaseService.client.auth.getSession();

    if (data.session) {
        return true;
    }

    await router.navigate(['/login']);

    return false;
};
