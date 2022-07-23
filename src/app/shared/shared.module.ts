import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';
import { UserService } from './service/user.service';
import { LoggedinGuard } from './security/loggedin.guard';
import { ScriptService } from './service/script.service';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    RouterModule
  ],
  declarations: [],
  exports: [],
  providers: [UserService, LoggedinGuard, ScriptService]
})
export class SharedModule { }
