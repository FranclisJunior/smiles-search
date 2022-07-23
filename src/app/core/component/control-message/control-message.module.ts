import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ControlMessagesComponent } from './control-message.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    imports: [
        CommonModule,
        TranslateModule
    ],
    declarations: [ControlMessagesComponent],
    exports: [ControlMessagesComponent],
    providers: []
})
export class ControlMessageModule { }
