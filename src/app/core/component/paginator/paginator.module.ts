import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginatorComponent } from './paginator.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    imports: [
        CommonModule,
        TranslateModule
    ],
    declarations: [PaginatorComponent],
    exports: [PaginatorComponent],
    providers: []
})
export class PaginatorModule { }
