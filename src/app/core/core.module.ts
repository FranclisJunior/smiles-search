import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { RouterModule } from '@angular/router';

import {TranslateModule} from '@ngx-translate/core';
import { AuthService } from './service/auth.service';
import { CrudService } from './service/crud.service';
import { NotificationService } from './service/notification.service';
import { SearchService } from './service/search.service';
import { TranslateService } from './service/translate.service';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    RouterModule
  ],
  declarations: [],
  exports: [],
  providers: [CrudService, NotificationService, SearchService, TranslateService, AuthService]
})
export class CoreModule { }
