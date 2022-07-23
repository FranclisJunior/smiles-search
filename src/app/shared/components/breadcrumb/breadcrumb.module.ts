import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';

import { NgxPermissionsModule } from 'ngx-permissions';
import { BreadcrumbComponent } from './breadcrumb.component';

@NgModule({
    imports: [
        CommonModule,
        TranslateModule,
        NgxPermissionsModule,
        RouterModule
    ],
    declarations: [BreadcrumbComponent],
    exports: [BreadcrumbComponent],
    providers: []
})
export class BreadcrumbModule { }
