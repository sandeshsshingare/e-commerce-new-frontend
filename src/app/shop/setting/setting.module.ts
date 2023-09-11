import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import { SettingRoutingModule } from './setting-routing.module';
import { ProfileSettingComponent } from './profile-setting/profile-setting.component';
import { SettingComponent } from './setting/setting.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { FormsModule } from '@angular/forms';
import { GeneralSettingComponent } from './general-setting/general-setting.component';
import { DeleteAccountComponent } from './delete-account/delete-account.component';
import { AddressComponent } from './address/address.component';

@NgModule({
  declarations: [
    ProfileComponent,
    ProfileSettingComponent,
    SettingComponent,
    ChangePasswordComponent,
    GeneralSettingComponent,
    DeleteAccountComponent,
    AddressComponent,
  ],
  imports: [CommonModule, SettingRoutingModule, FormsModule],
})
export class SettingModule {}
