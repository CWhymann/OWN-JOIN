import { Routes } from '@angular/router';
import { MainLayout } from './components/layout/main-layout/main-layout';
import { Login } from './components/login/login';
import { SignUp } from './components/sign-up/sign-up';
import { Summary } from './components/summary/summary';
import { AddTask } from './components/add-task/add-task';
import { Board } from './components/board/board';
import { Contacts } from './components/contacts/contacts';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: Login },
    { path: 'sign-up', component: SignUp },
    {
        path: '',
        component: MainLayout,
        children: [
            { path: 'summary', component: Summary },
            { path: 'add-task', component: AddTask },
            { path: 'board', component: Board },
            { path: 'contacts', component: Contacts },
        ],
    },
];
