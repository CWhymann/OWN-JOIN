import { Routes } from '@angular/router';
import { MainLayout } from './components/layout/main-layout/main-layout';
import { Login } from './components/login/login';
import { Summary } from './components/summary/summary';
import { AddTask } from './components/add-task/add-task';
import { Board } from './components/board/board';
import { ContactList } from './components/contacts/contact-list/contact-list';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },
  {
    path: '',
    component: MainLayout,
    children: [
      { path: 'summary', component: Summary },
      { path: 'add-task', component: AddTask },
      { path: 'board', component: Board },
      { path: 'contacts', component: ContactList },
    ],
  },
];
