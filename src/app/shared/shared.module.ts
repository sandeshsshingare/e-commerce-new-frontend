import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from './pagination/pagination.component';
import { NotificationComponent } from './notification/notification.component';

@NgModule({
  declarations: [PaginationComponent, NotificationComponent],
  imports: [CommonModule],
  exports: [PaginationComponent, NotificationComponent],
})
export class SharedModule {}
