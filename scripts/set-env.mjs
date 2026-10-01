import { existsSync, mkdirSync, writeFileSync } from 'node:fs';

const url = process.env.SUPABASE_URL;
const key = process.env.SUPABASE_ANON_KEY;
const target = 'src/environments/environment.ts';

if (url && key) {
    mkdirSync('src/environments', { recursive: true });
    writeFileSync(
        target,
        `export const environment = {\n    supabaseUrl: '${url}',\n    supabaseAnonKey: '${key}',\n};\n`,
    );
    console.log(`${target} created from environment variables.`);
} else if (existsSync(target)) {
    console.log(`${target} already exists, nothing to do.`);
} else {
    console.error(
        'Missing src/environments/environment.ts. Copy environment.example.ts to environment.ts ' +
            'and fill in your values, or set SUPABASE_URL and SUPABASE_ANON_KEY.',
    );
    process.exit(1);
}
