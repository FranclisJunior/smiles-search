import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { RouterModule } from '@angular/router';

import {TranslateModule} from '@ngx-translate/core';

import { NgxPermissionsModule } from 'ngx-permissions';
import { SidebarComponent } from './sidebar.component';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    NgxPermissionsModule,
    RouterModule
  ],
  declarations: [SidebarComponent],
  exports: [SidebarComponent],
  providers: []
})
export class SidebarModule { }
