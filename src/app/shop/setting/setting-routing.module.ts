import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { ProfileSettingComponent } from './profile-setting/profile-setting.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { GeneralSettingComponent } from './general-setting/general-setting.component';
import { DeleteAccountComponent } from './delete-account/delete-account.component';
import { AddressComponent } from './address/address.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'profile',
    pathMatch: 'full',
  },
  {
    path: 'profile',
    component: ProfileComponent,
  },

  {
    path: 'profile-setting',
    component: ProfileSettingComponent,
    children: [
      {
        path: '',
        redirectTo: 'general-setting',
        pathMatch: 'full',
      },
      {
        path: 'general-setting',
        component: GeneralSettingComponent,
      },
      {
        path: 'change-password',
        component: ChangePasswordComponent,
      },
      {
        path: 'delete-account',
        component: DeleteAccountComponent,
      },
      {
        path: 'address',
        component: AddressComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingRoutingModule {}
