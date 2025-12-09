import { Routes } from '@angular/router';

export const routes: Routes = [
	{ path: '', loadComponent: () => import('./components/user-list/user-list.component').then(m => m.UserListComponent) },
	{ path: 'user/new', loadComponent: () => import('./components/user-form/user-form.component').then(m => m.UserFormComponent) },
	{ path: 'user/edit/:nick', loadComponent: () => import('./components/user-form/user-form.component').then(m => m.UserFormComponent) },
	{ path: 'user/:nick', loadComponent: () => import('./components/user-detail/user-detail.component').then(m => m.UserDetailComponent) },
	{ path: '**', redirectTo: '' }
];
