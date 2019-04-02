import { Component, OnInit } from '@angular/core';
import { ConfirmDialogService } from '@services/confirm-dialog.service';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss'],
})
export class ConfirmDialogComponent implements OnInit {
  data = {
    title: '確認',
    content: '戻ると内容が破棄されます。よろしいですか？',
    acceptButton: '破棄する',
    cancelButton: 'キャンセル',
  };
  acceptButtonClass = 'is-danger';

  constructor(private confirmDialogService: ConfirmDialogService) { }

  ngOnInit() {
    this.confirmDialogService.eventShow.subscribe(
      obj => {
        Object.assign(this.data, obj || {});
        this.setAcceptButtonClass(obj);
        this.confirmDialogService.isShow = true;
      }
    );
  }

  submitModal(value: boolean) {
    this.confirmDialogService.isShow = false;
    this.confirmDialogService.closeConfirm(value);
  }

  get isShow() {
    return this.confirmDialogService.isShow;
  }

  private setAcceptButtonClass(options: any): void {
    if ('isPrimary' in options && options.isPrimary === true) {
      this.acceptButtonClass = 'is-primary';
    } else {
      this.acceptButtonClass = 'is-danger';
    }
  }
}
