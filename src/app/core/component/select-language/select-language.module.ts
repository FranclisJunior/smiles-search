import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectLanguageComponent } from './select-language.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    imports: [
        CommonModule,
        TranslateModule
    ],
    declarations: [SelectLanguageComponent],
    exports: [SelectLanguageComponent],
    providers: []
})
export class SelectLanguageModule { }
