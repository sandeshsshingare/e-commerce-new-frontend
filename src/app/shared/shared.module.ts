import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from './pagination/pagination.component';
import { NotificationComponent } from './notification/notification.component';
import { DiscountDirective } from './directives/discount.directive';
import { RatingDirective } from './directives/rating.directive';

@NgModule({
  declarations: [
    PaginationComponent,
    NotificationComponent,
    DiscountDirective,
    RatingDirective,
  ],
  imports: [CommonModule],
  exports: [
    PaginationComponent,
    NotificationComponent,
    DiscountDirective,
    RatingDirective,
  ],
})
export class SharedModule {}
