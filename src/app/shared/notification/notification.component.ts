import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css'],
})
export class NotificationComponent {
  @Input('title') title!: any;
  @Input('message') message: any;

  @Output() close: EventEmitter<boolean> = new EventEmitter<boolean>();
}
