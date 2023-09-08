import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css'],
})
export class NotificationComponent {
  controller = {
    title: '',
    message: '',
    flag: false,
    isError: false,
    isSuccess: false,
  };

  alert(
    title: string,
    message: any,
    flag: boolean,
    isError?: boolean,
    isSuccess?: boolean
  ) {
    this.close.emit(flag);
    this.controller['title'] = title;
    this.controller['message'] = message;
    this.controller['flag'] = flag;
    this.controller['isError'] = isError || false;
    this.controller['isSuccess'] = isSuccess || false;

    console.log('notifi', flag);

    setTimeout(() => {
      this.controller['flag'] = false;
      this.close.emit(this.controller['flag']);
    }, 5000);
  }

  // @Input('controller') controller!: any;

  @Output() close: EventEmitter<boolean> = new EventEmitter<boolean>();
}
