import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonChooseDirective } from './button-choose.directive';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [ButtonChooseDirective],
    exports: [ButtonChooseDirective],
    providers: []
})
export class ButtonChooseModule { }
