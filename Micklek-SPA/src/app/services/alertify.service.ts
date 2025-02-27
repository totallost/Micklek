import { Injectable } from '@angular/core';
declare let alertify: any;

@Injectable({
  providedIn: 'root'
})
export class AlertifyService {

  constructor() { }

  confirm(confirmTitle: string, message: string, okCallback: () => any, cancelCallback: () => any) {
    alertify.confirm(confirmTitle, message, function(e) {
      if (e) {
        okCallback();
      } else {}
    }, function(c) {
      if (c) {
        cancelCallback();
      } else {}
    });
  }

  success(message: string) {
    alertify.success(message);
  }
  error(message: string) {
    alertify.error(message);
  }
  warning(message: string) {
    alertify.warning(message);
  }
  message(message: string) {
    alertify.message(message);
  }
}
