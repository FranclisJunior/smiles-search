import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SimpleSearchComponent } from './simple-search.component';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        TranslateModule
    ],
    declarations: [SimpleSearchComponent],
    exports: [SimpleSearchComponent],
    providers: []
})
export class SimpleSearchModule { }
