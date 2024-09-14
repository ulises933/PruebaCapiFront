import { Routes } from '@angular/router';
import { ContactListComponent } from './components/contact-list/contact-list.component';
import { AddContactComponent } from './components/add-contact/add-contact.component';
import { ContactDetailsComponent } from './contact-details/contact-details.component';
import { EditContactComponent } from './edit-contact/edit-contact.component';

import { provideRouter } from '@angular/router';

export const appRoutes: Routes = [
  { path: 'contacts', component: ContactListComponent },
  { path: 'contacts/new', component: AddContactComponent },
  { path: '', redirectTo: '/contacts', pathMatch: 'full' },
  { path: 'contact/:id', component: ContactDetailsComponent },
  { path: 'contacts/edit/:id', component: EditContactComponent },

];

export const appRoutingProviders = [
  provideRouter(appRoutes)
];
