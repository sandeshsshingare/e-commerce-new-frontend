import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from './pagination/pagination.component';
import { NotificationComponent } from './notification/notification.component';
import { DiscountDirective } from './directives/discount.directive';

@NgModule({
  declarations: [PaginationComponent, NotificationComponent, DiscountDirective],
  imports: [CommonModule],
  exports: [PaginationComponent, NotificationComponent, DiscountDirective],
})
export class SharedModule {}
