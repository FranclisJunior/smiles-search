import { Injectable } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';

/**
 * Module for user notification by 'toast' style.
 */
@Injectable()
export class NotificationService {

  /**
   * Constructor.
   *
   * @param {TranslateService} translateService
   * @param {ToastrService} toastService
   */
  constructor(public translateService: TranslateService, public toastService: ToastrService) {}

  /* Defaults */
  success() {
    this.successText(this.translateService.instant('operations.success.message'));
  }

  successText(text: string) {
    this.toastService.success(text, 'Sucesso');
  }

  error(text: string) {
    this.toastService.error(text, 'Erro');
  }

  warning(text: string) {
    this.toastService.warning(text, 'Atenção');
  }

  info(text: string) {
    this.toastService.info(text, 'Informação');
  }

  /* CRUD */
  insertSuccess() {
    this.translateService.get('operations.insert.success').subscribe((message: string) => {
      this.successText(message);
    });
  }

  insertError() {
    this.translateService.get('operations.insert.error').subscribe((message: string) => {
      this.error(message);
    });
  }

  updateSuccess() {
    this.translateService.get('operations.update.success').subscribe((message: string) => {
      this.successText(message);
    });
  }

  updateError() {
    this.translateService.get('operations.update.error').subscribe((message: string) => {
      this.error(message);
    });
  }

  saveSuccess() {
    this.translateService.get('operations.save.success').subscribe((message: string) => {
      this.successText(message);
    });
  }

  saveError() {
    this.translateService.get('operations.save.error').subscribe((message: string) => {
      this.error(message);
    });
  }

  deleteSuccess() {
    this.translateService.get('operations.delete.success').subscribe((message: string) => {
      this.successText(message);
    });
  }

  deleteError() {
    this.translateService.get('operations.delete.error').subscribe((message: string) => {
      this.successText(message);
    });
  }

}
