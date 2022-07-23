import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoadingButtonComponent } from './loading-button.component';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [LoadingButtonComponent],
    exports: [LoadingButtonComponent],
    providers: []
})
export class LoadingButtonModule { }
