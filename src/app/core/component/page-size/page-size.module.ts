import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PageSizeComponent } from './page-size.component';
import { Select2Module } from 'src/app/shared/directive/select2/select2.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        Select2Module,
        TranslateModule
    ],
    declarations: [PageSizeComponent],
    exports: [PageSizeComponent],
    providers: []
})
export class PageSizeModule { }
