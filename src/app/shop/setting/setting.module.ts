import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import { SettingRoutingModule } from './setting-routing.module';

@NgModule({
  declarations: [ProfileComponent],
  imports: [CommonModule, SettingRoutingModule],
})
export class SettingModule {}
