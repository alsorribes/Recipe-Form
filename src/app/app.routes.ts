import { Routes } from '@angular/router';
import { FormComponent } from './form/form';

export const routes: Routes = [
  { path: '', component: FormComponent },
  { path: '**', redirectTo: '' },
];
