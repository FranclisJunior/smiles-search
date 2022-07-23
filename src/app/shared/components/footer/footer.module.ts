import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';

import { NgxPermissionsModule } from 'ngx-permissions';
import { FooterComponent } from './footer.component';
// import { SelectLanguageModule } from '../select-language/select-language.module';

@NgModule({
    imports: [
        CommonModule,
        TranslateModule,
        NgxPermissionsModule,
        // SelectLanguageModule,
        RouterModule
    ],
    declarations: [FooterComponent],
    exports: [FooterComponent],
    providers: []
})
export class FooterModule { }
