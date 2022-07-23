import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { RouterModule } from '@angular/router';

import {TranslateModule} from '@ngx-translate/core';
import { HeaderComponent } from './header.component';

import { NgxPermissionsModule } from 'ngx-permissions';
import { SelectLanguageModule } from 'src/app/core/component/select-language/select-language.module';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    NgxPermissionsModule,
    SelectLanguageModule,
    RouterModule
  ],
  declarations: [HeaderComponent],
  exports: [HeaderComponent],
  providers: []
})
export class HeaderModule { }
