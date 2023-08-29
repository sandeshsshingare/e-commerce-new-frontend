import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from '../guards/auth.guard';
import { ProfileComponent } from './profile/profile.component';
import { CompanyComponent } from './company/company.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  {
    path: 'organization',
    component: CompanyComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
  },
  {
    path: 'users',
    component: UsersComponent,
  },
  {
    path: '',
    redirectTo: 'profile',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingRoutingModule {}
