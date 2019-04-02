import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class ConfirmDialogService {
  eventShow: EventEmitter<Object>;
  eventDone: EventEmitter<boolean>;
  isShow = false;

  constructor() {
    this.eventShow = new EventEmitter();
  }

  showConfirm(params?: {}): EventEmitter<boolean> {
    this.eventShow.emit(params);
    this.eventDone = new EventEmitter();
    return this.eventDone;
  }

  closeConfirm(value: boolean) {
    this.eventDone.emit(value);
    this.eventDone.complete();
  }
}
