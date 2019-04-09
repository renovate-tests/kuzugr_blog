import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, PatternValidator } from '@angular/forms';
import { ValidateForm } from '@functions/validate-forms';
import { Comment } from '@models/comment';
import { CommentService } from '@services/comment.service';
import { AuthService } from '@services/auth.service';
import { ConfirmDialogService } from '@services/confirm-dialog.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
})
export class CommentComponent implements OnInit {
  @Input() comments: Array<Comment>;
  @Input() articleId: number;

  form: FormGroup;
  formErrors: {[key: string]: Array<string>} = {};
  gotError: boolean;
  sendSuccess: boolean;
  isDisabled: boolean;
  comment: Comment;
  loginState: boolean;
  readyCommentForm: boolean;
  validationMessages = {
    'name': {
      'required': '名前を入力してください。',
      'maxlength': '名前は50文字以内で入力してください。',
      'pattern': '名前に使用できない文字が含まれています。',
    },
    'content': {
      'required': 'コメント内容を入力してください。',
      'maxlength': 'コメント内容は500文字以内で入力してください。',
    },
  };

  constructor(private commentService: CommentService,
              private authService: AuthService,
              private confirmDialogService: ConfirmDialogService) { }

  ngOnInit() {
    this.isDisabled = false;
    this.loginState = false;
    this.readyCommentForm = false;
    this.initializeForm();
  }

  initializeForm() {
    this.authService.loginState().then(
      response => {
        this.loginState = response['login_state'];
        if (this.loginState) {
          this.ownerForm();
        } else {
          this.commonForm();
        }
      },
      error => {
        this.commonForm();
      },
    );
  }

  commonForm() {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.maxLength(50),  Validators.pattern(/^(?!.*kuzugr).*$/)]),
      content: new FormControl('', [Validators.required, Validators.maxLength(500)]),
    });
    this.readyCommentForm = true;
  }

  ownerForm() {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      content: new FormControl('', [Validators.required, Validators.maxLength(500)]),
    });
    this.readyCommentForm = true;
  }

  onSubmit() {
    this.isDisabled = true;
    if (this.form.valid) {
      this.formErrors = {};
      this.comment = this.form.value;
      this.comment.article_id = this.articleId;
      this.createComment();
    } else {
      this.isDisabled = false;
      this.formErrors = ValidateForm(this.form, false, this.validationMessages);
    }
  }

  createComment() {
    this.commentService.createComment(this.comment).subscribe(
      response => {
        this.sendSuccess = true;
        this.commentService.getComments(this.articleId).subscribe(
          getReesponse => {
            this.comments = getReesponse;
          },
          error => {
          },
        );
      },
      error => {
        this.gotError = true;
      },
    );
  }

  getLoginState() {
    this.authService.loginState().then(
      response => {
        this.loginState = response['login_state'];
      },
    );
  }

  deleteComment(commentId: number) {
    this.confirmDialogService.showConfirm({
      title: 'コメント削除',
      content: 'コメントを削除してよろしいですか？',
      acceptButton: '削除する',
      cancelButton: 'キャンセル',
      isDanger: true,
    }).subscribe(confirm => {
      if (confirm) {
        this.commentService.deleteComment(commentId).subscribe(
          response => {
            this.commentService.getComments(this.articleId).subscribe(
              getReesponse => {
                this.comments = getReesponse;
              },
              error => {
              },
            );
          },
          error => {
          },
        );
      }
    });
  }
// tslint:disable-next-line:max-file-line-count
}
