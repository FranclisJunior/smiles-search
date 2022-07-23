import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeleteConfirmationComponent } from './delete-confirmation.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    imports: [
        CommonModule,
        TranslateModule
    ],
    declarations: [DeleteConfirmationComponent],
    exports: [DeleteConfirmationComponent],
    providers: []
})
export class DeleteConfirmationModule { }
