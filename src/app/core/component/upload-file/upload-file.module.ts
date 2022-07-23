import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadFileComponent } from './upload-file.component';
import { TranslateModule } from '@ngx-translate/core';
import { UploadFileDirectiveModule } from '../../directive/upload-file/upload-file-directive.module';



@NgModule({
  declarations: [UploadFileComponent],
  exports: [UploadFileComponent],
  imports: [
    CommonModule,
    TranslateModule,
    UploadFileDirectiveModule
  ]
})
export class UploadFileModule { }
